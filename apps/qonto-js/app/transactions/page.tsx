import { Header } from "./header";
import { Filters } from "./filters";

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
      <table>Transactions table</table>
    </section>
  );
}
