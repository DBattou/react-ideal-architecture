import { Header } from "@/components/header";
import { Filters } from "@/components/filters";
import { TransactionsTable } from "@/components/transactions-table";
import { Transaction, getTransactions } from "@/services/transactions";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const FAKE_AMOUNT = 24.32;

export default function TransactionsIndex() {
  const { query } = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      let result = await getTransactions({ query: query.query });

      setTransactions(result.transactions);
    };
    fetchTransactions();
  }, [query.query]);

  return (
    <section>
      <Header
        title={FAKE_AMOUNT.toLocaleString("en-US", {
          style: "currency",
          currency: "eur",
        })}
      />
      <Filters />
      <TransactionsTable transactions={transactions} />
    </section>
  );
}
