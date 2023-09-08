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

const fakeData: Transaction[] = [
  {
    id: "1",
    amount: 12,
    operationMethod: "transfer",
    counterpartyName: "Movistar",
    emittedAt: new Date("2023-05-23"),
    side: "credit",
    activityTag: "other_income",
    status: "pending",
  },
  {
    id: "2",
    amount: 22,
    operationMethod: "direct_debit",
    counterpartyName: "MR MORIN PATRICK",
    emittedAt: new Date("2023-06-12"),
    side: "debit",
    activityTag: "other_expense",
    status: "completed",
  },
  {
    id: "3",
    amount: 69,
    operationMethod: "transfer",
    counterpartyName: "David Laroche World Inc",
    emittedAt: new Date("2023-08-14"),
    side: "debit",
    activityTag: "treasury_and_interco",
    status: "declined",
  },
  {
    id: "4",
    amount: 420,
    operationMethod: "transfer",
    counterpartyName: "Deliveroo France SAS",
    emittedAt: new Date("2023-09-07"),
    side: "debit",
    activityTag: "other_expense",
    status: "completed",
  },
  {
    id: "5",
    amount: 42,
    operationMethod: "transfer",
    counterpartyName: "CONDOMINIO CADORE",
    emittedAt: new Date("2023-12-12"),
    side: "credit",
    activityTag: "fees",
    status: "pending",
  },
];

export function getTransactions(): Transaction[] {
  return fakeData;
}
