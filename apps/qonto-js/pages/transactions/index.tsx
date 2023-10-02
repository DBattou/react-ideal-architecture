import { Header } from "@/components/header";
import { Filters } from "@/components/filters";
import { TransactionsTable } from "@/components/transactions-table";
import {
  TransactionsListPayload,
  searchTransactions,
} from "@/services/transactions";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next";
import { PageSelector } from "@/components/page-selector";
import styles from "./styles.module.css";
import { useQuery } from "@tanstack/react-query";

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

export default function TransactionsIndex({
  sortBy,
  query,
  page,
  perPage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [sortParam, sortDirection] = sortBy.split(":");

  const currentSort = [
    {
      id: sortParam,
      desc: sortDirection === "desc",
    },
  ];

  const { data } = useQuery({
    queryKey: [
      "transactions",
      sortDirection, // will refresh when it update
      sortParam,
      query,
      page,
      perPage,
    ],
    queryFn: async ({ signal }) =>
      await searchTransactions(
        { sortDirection, sortParam, query, page, perPage },
        { signal }
      ),
    placeholderData: PLACEHOLDER_DATA,
    keepPreviousData: true,
  });

  const handleSortingChange = (sorting) => {
    const [nextSort] = sorting(currentSort);

    if (nextSort) {
      router.query.sort_by = `${nextSort.id}:${nextSort.desc ? "desc" : "asc"}`;
    } else {
      delete router.query.sort_by;
    }

    router.replace(router);
  };

  const handlePageChange = (page: number) => {
    if (page !== 1) {
      router.query.page = String(page);
    } else {
      delete router.query.page;
    }

    router.replace(router);
  };

  const handlePerPageChange = (perPage: number) => {
    if (perPage !== 25) {
      router.query.per_page = String(perPage);
    } else {
      delete router.query.per_page;
    }
    delete router.query.page;

    router.replace(router);
  };

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
          transactions={data.transactions}
          onSortingChange={handleSortingChange}
          sorting={currentSort}
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

export async function getServerSideProps(context) {
  /**
   * The transactions search request should ultimately land here, but mirage doesn't catch
   * server-side requests so it's done on the client until mirage-msw is a thing.
   */

  /**
   * Query params retrieval is done here since a page without `getServerSideProps`
   * would get statically optimized by Next and first rendered without query params.
   *
   * Using `router.isReady` in this case would also fix the issue but
   * we still need QPs from the first render
   * because we're passing them to a `defaultValue` prop
   */
  const {
    sort_by = "emitted_at:desc",
    query = "",
    page = "1",
    per_page = "25",
  } = context.query as Record<string, string>;
  return {
    props: {
      page: parseInt(page, 10),
      perPage: parseInt(per_page, 10),
      sortBy: sort_by,
      query,
    },
  };
}
