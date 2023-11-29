import { rest } from "msw";
import type { TransactionsListPayload } from "@/services/transactions";
import type { Serialized } from "@/types/utils";
import { transactionsPlayload } from "./fixtures/transactions";

export default [
  rest.post("/api/v6/transactions/search", (_req, res, ctx) => {
    return res(
      ctx.json<Serialized<TransactionsListPayload>>(transactionsPlayload)
    );
  }),
];
