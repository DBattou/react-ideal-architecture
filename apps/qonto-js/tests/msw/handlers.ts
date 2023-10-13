import { rest } from "msw";
import type { TransactionsListPayload } from "@/services/transactions";

export default [
  rest.post("/api/v6/transactions/search", (_req, res, ctx) => {
    return res(
      ctx.json<TransactionsListPayload>({
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
      })
    );
  }),
];
