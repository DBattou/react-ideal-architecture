import { Header } from "./header";

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
      <form>Transactions filters</form>
      <table>Transactions table</table>
    </section>
  );
}
