import { Header } from "@/components/header";
import { Filters } from "@/components/filters";
import { TransactionsTable } from "@/components/transactions-table";

const FAKE_AMOUNT = 24.32;

export default function TransactionsIndex() {
  return (
    <section>
      <Header
        title={FAKE_AMOUNT.toLocaleString("en-US", {
          style: "currency",
          currency: "eur",
        })}
      />
      <Filters />
      <TransactionsTable />
    </section>
  );
}
