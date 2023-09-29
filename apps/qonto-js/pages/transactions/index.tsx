import { Header } from "@/components/header";
import { Filters } from "@/components/filters";
import { TransactionsTable } from "@/components/transactions-table";
import {
  Transaction,
  TransactionsListMeta,
  searchTransactions,
} from "@/services/transactions";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next";
import { isAbortError } from "@/utils/error";
import { PageSelector } from "@/components/page-selector";
import styles from "./styles.module.css";

const FAKE_AMOUNT = 24.32;

export default function TransactionsIndex({
  sortBy,
  query,
  page,
  perPage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [meta, setMeta] = useState<TransactionsListMeta>(null);

  const [sortParam, sortDirection] = sortBy.split(":");

  const currentSort = [
    {
      id: sortParam,
      desc: sortDirection === "desc",
    },
  ];

  useEffect(() => {
    const abortController = new AbortController();
    const fetchTransactions = async () => {
      try {
        let result = await searchTransactions(
          { sortDirection, sortParam, query, page, perPage },
          { signal: abortController.signal }
        );
        setTransactions(result.transactions);
        setMeta(result.meta);
      } catch (error) {
        if (!isAbortError(error)) {
          throw error;
        }
      }
    };

    fetchTransactions();

    return () => {
      abortController.abort();
    };
  }, [sortDirection, sortParam, query, page, perPage]);

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
          transactions={transactions}
          onSortingChange={handleSortingChange}
          sorting={currentSort}
        />
      </div>
      <PageSelector
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
        page={page}
        perPage={perPage}
        /**
         * we're not handling loading states for now so 0 is a decent default
         */
        totalCount={meta?.totalCount ?? 0}
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
