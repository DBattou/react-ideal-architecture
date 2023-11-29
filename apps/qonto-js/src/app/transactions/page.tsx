'use client';
import type { SortingState } from "@tanstack/react-table";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { TransactionsTable } from "qonto-js-transactions-ui";
import { useDebouncedCallback } from "use-debounce";
import { Header } from "@/components/header";
import { Filters } from "@/components/filters";
import {
  type TransactionsListPayload,
  searchTransactions,
} from "@/services/transactions";
import { PageSelector } from "@/components/page-selector";
import styles from "./styles.module.css";

const FAKE_AMOUNT = 24.32;

const PLACEHOLDER_DATA: TransactionsListPayload = {
  transactions: [
    {
      id: "0",
      counterpartyName: "Dunder Mifflin Paper Company, Inc.",
      operationMethod: "transfer",
      emittedAt: new Date(),
      amount: 0,
      side: "credit",
      activityTag: "other_expense",
      status: "completed",
    },
  ],
  meta: { totalCount: 1 },
};

export default function TransactionsIndex(): JSX.Element {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const query = (searchParams.get('query')) ?? "";
  const page = parseInt((searchParams.get('page')) ?? "1");
  const perPage = parseInt((searchParams.get('per_page')) ?? "25");
  const sortBy = (searchParams.get('sort_by')) ?? "emitted_at:desc";

  const [sortParam, sortDirection] = sortBy.split(":");

  const currentSort = [
    {
      id: sortParam,
      desc: sortDirection === "desc",
    },
  ];

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "transactions",
      {
        sortDirection,
        sortParam,
        query,
        page,
        perPage,
      },
    ],
    queryFn: ({ signal }) =>
      searchTransactions(
        { sortDirection, sortParam, query, page, perPage },
        { signal }
      ),
    placeholderData: PLACEHOLDER_DATA,
    keepPreviousData: true,
  });

  const handleSortingChange = (
    sorting: (state: SortingState) => SortingState
  ): void => {
    const [nextSort]: SortingState = sorting(currentSort);
    const params = new URLSearchParams(searchParams.toString());
    if (nextSort.desc && nextSort.id === "emitted_at") {
      params.delete('sort_by');
    } else {
      params.set('sort_by', `${nextSort.id}:${nextSort.desc ? "desc" : "asc"}`);
    }

    router.replace(`${pathName}?${params.toString()}`);
  };

  const handlePageChange = (selectedPage: number): void => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedPage !== 1) {
      params.set('page', String(selectedPage));
    } else {
      params.delete('page');
    }

    router.replace(`${pathName}?${params.toString()}`);
  };

  const handlePerPageChange = (selectedPerPage: number): void => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedPerPage !== 25) {
      params.set('per_page', String(selectedPerPage));
    } else {
      params.delete('per_page');
    }
    params.delete('page');

    router.replace(`${pathName}?${params.toString()}`)
  };

  const handleQueryChange = useDebouncedCallback((q: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (q) {
      params.set('query', q);
    } else {
      params.delete('query');
    }
    params.delete('page');

    router.replace(`${pathName}?${params.toString()}`)
  }, 100);

  /**
   * These will not show up with the current RQ config
   * but I'm using them for "data" type narrowing.
   * without them data is not guaranteed to be filled so TS is not happy
   */
  if (isError) return <div>OH NO</div>;
  if (isLoading) return <div>Loading ... Beep boop...</div>;

  return (
    <section className={styles.mainContent}>
      <Header
        title={FAKE_AMOUNT.toLocaleString("en-US", {
          style: "currency",
          currency: "eur",
        })}
      />
      <Filters initialQuery={query} onQueryChange={handleQueryChange} />
      <div className={styles.tableWrapper}>
        <TransactionsTable
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
    </section>
  );
}
