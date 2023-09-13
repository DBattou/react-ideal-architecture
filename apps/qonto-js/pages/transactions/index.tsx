import { Header } from "@/components/header";
import { Filters } from "@/components/filters";
import { TransactionsTable } from "@/components/transactions-table";
import { Transaction, searchTransactions } from "@/services/transactions";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next";

const FAKE_AMOUNT = 24.32;

export default function TransactionsIndex({
  sortBy,
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [sortParam, sortDirection] = sortBy.split(":");

  const currentSort = [
    {
      id: sortParam,
      desc: sortDirection === "desc",
    },
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
      let result = await searchTransactions({
        sortDirection,
        sortParam,
        query,
      });
      setTransactions(result.transactions);
    };

    fetchTransactions();
  }, [sortDirection, sortParam, query]);

  const handleSortingChange = (sorting) => {
    const [nextSort] = sorting(currentSort);

    if (nextSort) {
      router.query.sort_by = `${nextSort.id}:${nextSort.desc ? "desc" : "asc"}`;
    } else {
      delete router.query.sort_by;
    }

    router.replace(router);
  };

  return (
    <section>
      <Header
        title={FAKE_AMOUNT.toLocaleString("en-US", {
          style: "currency",
          currency: "eur",
        })}
      />
      <Filters />
      <TransactionsTable
        transactions={transactions}
        onSortingChange={handleSortingChange}
        sorting={currentSort}
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
  const { sort_by = "emitted_at:desc", query = "" } = context.query as Record<
    string,
    string
  >;
  return {
    props: {
      sortBy: sort_by,
      query,
    },
  };
}
