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
