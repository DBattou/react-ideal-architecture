import { Header } from "@/components/header";
import { Filters } from "@/components/filters";
import { TransactionsTable } from "@/components/transactions-table";
import {
  type TransactionsListPayload,
  searchTransactions,
} from "@/services/transactions";
import { useRouter } from "next/router";
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

export default function TransactionsIndex() {
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

  const { data } = useQuery({
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
    queryFn: async ({ signal }) =>
      await searchTransactions(
        { sortDirection, sortParam, query, page, perPage },
        { signal }
      ),
    placeholderData: PLACEHOLDER_DATA,
    keepPreviousData: true,
    enabled: router.isReady,
  });

  const handleSortingChange = (sorting) => {
    const [nextSort] = sorting(currentSort);

    if (nextSort) {
      router.query.sort_by = `${nextSort.id}:${nextSort.desc ? "desc" : "asc"}`;
    } else {
      delete router.query.sort_by;
    }

    router.replace({ query: router.query });
  };

  const handlePageChange = (page: number) => {
    if (page !== 1) {
      router.query.page = String(page);
    } else {
      delete router.query.page;
    }

    router.replace({ query: router.query });
  };

  const handlePerPageChange = (perPage: number) => {
    if (perPage !== 25) {
      router.query.per_page = String(perPage);
    } else {
      delete router.query.per_page;
    }
    delete router.query.page;

    router.replace({ query: router.query });
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
