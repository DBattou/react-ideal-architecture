import type { SortingState } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/src/components/header";
import { Filters } from "@/src/components/filters";
import { TransactionsTable } from "@/src/components/transactions-table";
import {
  type TransactionsListPayload,
  searchTransactions,
} from "@/src/services/transactions";
import { PageSelector } from "@/src/components/page-selector";
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

  const query = (router.query.query as string) ?? "";
  const page = parseInt((router.query.page as string) ?? "1");
  const perPage = parseInt((router.query.per_page as string) ?? "25");
  const sortBy = (router.query.sort_by as string) ?? "emitted_at:desc";
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
    enabled: router.isReady,
  });

  const handleSortingChange = (
    sorting: (state: SortingState) => SortingState
  ): void => {
    const [nextSort]: SortingState = sorting(currentSort);

    if (nextSort.desc && nextSort.id === "emitted_at") {
      delete router.query.sort_by;
    } else {
      router.query.sort_by = `${nextSort.id}:${nextSort.desc ? "desc" : "asc"}`;
    }

    void router.replace({ query: router.query });
  };

  const handlePageChange = (selectedPage: number): void => {
    if (selectedPage !== 1) {
      router.query.page = String(selectedPage);
    } else {
      delete router.query.page;
    }

    void router.replace({ query: router.query });
  };

  const handlePerPageChange = (selectedPerPage: number): void => {
    if (selectedPerPage !== 25) {
      router.query.per_page = String(selectedPerPage);
    } else {
      delete router.query.per_page;
    }
    delete router.query.page;

    void router.replace({ query: router.query });
  };

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
      <Filters />
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
