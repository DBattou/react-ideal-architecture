"use client";
import type { SortingState } from "@tanstack/react-table";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { TransactionsTable } from "qonto-js-transactions-ui";
import { useDebouncedCallback } from "use-debounce";
import type { Transaction } from "transactions-entity";
import { Header } from "@/components/header";
import { Filters } from "@/components/filters";
import { PageSelector } from "@/components/page-selector";
import { useTransactions } from "@/hooks/use-transactions";
import styles from "./layout.module.css";

const FAKE_AMOUNT = 24.32;

export default function TransactionsLayout({ children }): JSX.Element {
  const router = useRouter();
  const pathName = usePathname() ?? "";
  const searchParams = useSearchParams();

  const query = searchParams?.get("query") ?? "";
  const page = parseInt(searchParams?.get("page") ?? "1");
  const perPage = parseInt(searchParams?.get("per_page") ?? "25");
  const sortBy = searchParams?.get("sort_by") ?? "emitted_at:desc";

  const [sortParam, sortDirection] = sortBy.split(":");

  const currentSort = [
    {
      id: sortParam,
      desc: sortDirection === "desc",
    },
  ];

  const { data, isLoading, isError } = useTransactions({
    sortDirection,
    sortParam,
    query,
    page,
    perPage,
  });

  const handleSortingChange = (
    sorting: (state: SortingState) => SortingState
  ): void => {
    const [nextSort]: SortingState = sorting(currentSort);
    const params = new URLSearchParams(searchParams?.toString());
    if (nextSort.desc && nextSort.id === "emitted_at") {
      params.delete("sort_by");
    } else {
      params.set("sort_by", `${nextSort.id}:${nextSort.desc ? "desc" : "asc"}`);
    }

    router.replace(`${pathName}?${params.toString()}`);
  };

  const handlePageChange = (selectedPage: number): void => {
    const params = new URLSearchParams(searchParams?.toString());
    if (selectedPage !== 1) {
      params.set("page", String(selectedPage));
    } else {
      params.delete("page");
    }

    router.replace(`${pathName}?${params.toString()}`);
  };

  const handlePerPageChange = (selectedPerPage: number): void => {
    const params = new URLSearchParams(searchParams?.toString());
    if (selectedPerPage !== 25) {
      params.set("per_page", String(selectedPerPage));
    } else {
      params.delete("per_page");
    }
    params.delete("page");

    router.replace(`${pathName}?${params.toString()}`);
  };

  const handleQueryChange = useDebouncedCallback((q: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (q) {
      params.set("query", q);
    } else {
      params.delete("query");
    }
    params.delete("page");

    router.replace(`${pathName}?${params.toString()}`);
  }, 100);

  const handleRowClick = (id: Transaction["id"]): void => {
    router.push(`/transactions/${id}?${searchParams.toString()}`);
  };

  function renderTransactions(): JSX.Element {
    if (isError) return <div>OH NO</div>;
    if (isLoading) return <div>Loading transactions... Beep boop...</div>;
    return (
      <>
        <div className={styles.tableWrapper}>
          <TransactionsTable
            onRowClick={handleRowClick}
            onSortingChange={handleSortingChange}
            sorting={currentSort}
            transactions={data.transactions}
          />
        </div>
        <PageSelector
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
          page={page}
          perPage={perPage}
          totalCount={data.meta.totalCount}
        />
      </>
    );
  }

  return (
    <>
      <section className={styles.mainContent}>
        <Header
          title={FAKE_AMOUNT.toLocaleString("en-US", {
            style: "currency",
            currency: "eur",
          })}
        />
        <Filters initialQuery={query} onQueryChange={handleQueryChange} />
        {renderTransactions()}
      </section>
      {children}
    </>
  );
}
