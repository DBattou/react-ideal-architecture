import type { TransactionsListPayload } from "@/services/transactions";

export const transactionsPlayload: TransactionsListPayload = {
  transactions: [
    {
      id: "0",
      counterpartyName: "Left Behind",
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
