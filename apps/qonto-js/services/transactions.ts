import camelcaseKeys from "camelcase-keys";

export type Transaction = {
  id: string;
  counterpartyName: string;
  operationMethod:
    | "transfer"
    | "direct_debit"
    | "card"
    | "cheque"
    | "biller"
    | "tax"
    | "pagopa_payment";
  emittedAt: Date;
  amount: number;
  side: "credit" | "debit";
  activityTag:
    | "other_expense"
    | "treasury_and_interco"
    | "fees"
    | "other_income";
  status: "completed" | "declined" | "pending" | "reversed";
};

export type TransactionsListMeta = {
  totalCount: number;
};

type TransactionsListPayload = {
  meta: TransactionsListMeta;
  transactions: Transaction[];
};

function transformTransaction(responseTransaction): Transaction {
  return {
    ...responseTransaction,
    emitted_at: responseTransaction.emitted_at
      ? new Date(responseTransaction.emitted_at)
      : null,
  };
}

function transformTransactionsListPayload(data): TransactionsListPayload {
  return camelcaseKeys(
    { ...data, transactions: data.transactions.map(transformTransaction) },
    { deep: true }
  );
}

export async function searchTransactions(
  { query = "", sortParam = "", sortDirection = "", page = 1, perPage = 25 },
  fetchOptions
): Promise<TransactionsListPayload> {
  const result = await fetch(`/api/v6/transactions/search`, {
    ...fetchOptions,
    method: "post",
    body: JSON.stringify({
      search: query,
      sort: { property: sortParam, direction: sortDirection },
      pagination: { page, per_page: perPage },
    }),
  }).then((res) => res.json());

  return transformTransactionsListPayload(result);
}
