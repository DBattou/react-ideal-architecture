type OperationMethod =
  | "transfer"
  | "card"
  | "cheque"
  | "direct_debit"
  | "biller"
  | "tax"
  | "pagopa_payment"
  | "pay_later";

type OperationSide = "credit" | "debit";

type ActivityTag =
  | "other_expense"
  | "treasury_and_interco"
  | "fees"
  | "other_income";

type Status = "completed" | "declined" | "pending" | "reversed";

export type Transaction = {
  id: string;
  counterpartyName: string;
  operationMethod: OperationMethod;
  emittedAt: Date;
  amount: number;
  side: OperationSide;
  activityTag: ActivityTag;
  status: Status;
};
