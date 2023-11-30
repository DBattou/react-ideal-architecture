import type { Transaction } from "transactions-entity";
import type { TransactionsListPayload } from "@/services/transactions";
import type { Serialized } from "@/types/utils";

function createTransactions(
  number: number,
  overrides?: Partial<Serialized<Transaction>>
): Serialized<Transaction>[] {
  return Array.from({ length: number }).map((_, index) => ({
    id: index.toString(),
    counterparty_name: `Transaction ${index}`,
    operation_method: "transfer",
    emitted_at: "2020-01-01",
    amount: index,
    side: "credit",
    activity_tag: "other_expense",
    status: "completed",
    ...overrides,
  }));
}

export const transactionsPlayload: Serialized<TransactionsListPayload> = {
  transactions: createTransactions(26),
  meta: { total_count: 26 },
};
