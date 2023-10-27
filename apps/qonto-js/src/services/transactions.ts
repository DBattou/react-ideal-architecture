import camelcaseKeys from "camelcase-keys";
import type { Transaction } from "transactions-entity";
import type { Serialized } from "@/types/utils";

export type TransactionsListPayload = {
  meta: { totalCount: number };
  transactions: Transaction[];
};

function transformTransaction(
  responseTransaction: Serialized<Transaction>
): Transaction {
  return camelcaseKeys({
    ...responseTransaction,
    emitted_at: new Date(responseTransaction.emitted_at),
  });
}

function transformTransactionsListPayload(
  data: Serialized<TransactionsListPayload>
): TransactionsListPayload {
  return {
    meta: camelcaseKeys(data.meta),
    transactions: data.transactions.map(transformTransaction),
  };
}

export async function searchTransactions(
  { query = "", sortParam = "", sortDirection = "", page = 1, perPage = 25 },
  fetchOptions: Partial<RequestInit>
): Promise<TransactionsListPayload> {
  const result = await fetch(`/api/v6/transactions/search`, {
    ...fetchOptions,
    method: "post",
    body: JSON.stringify({
      search: query,
      sort: { property: sortParam, direction: sortDirection },
      pagination: { page, per_page: perPage },
    }),
  }).then((res): Promise<Serialized<TransactionsListPayload>> => res.json());

  return transformTransactionsListPayload(result);
}

type TransactionPayload = {
  transaction: Transaction;
};

function transformTransactionPayload(
  data: Serialized<TransactionPayload>
): TransactionPayload {
  return { transaction: transformTransaction(data.transaction) };
}

export async function getTransaction(
  id: Transaction["id"],
  fetchOptions: Partial<RequestInit>
): Promise<TransactionPayload> {
  const result = await fetch(`/api/v6/transactions/${id}`, fetchOptions).then(
    (res): Promise<Serialized<TransactionPayload>> => res.json()
  );

  return transformTransactionPayload(result);
}
