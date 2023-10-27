import { Factory } from "miragejs";
import type { Transaction } from "transactions-entity";
import { faker } from "@faker-js/faker";

export default Factory.extend<Partial<Transaction>>({
  activityTag: () =>
    faker.helpers.arrayElement<Transaction["activityTag"]>([
      "other_expense",
      "treasury_and_interco",
      "fees",
      "other_income",
    ]),
  amount: () => faker.number.float({ precision: 0.01 }),
  counterpartyName: () => faker.company.name(),
  emittedAt: () => faker.date.past(),
  operationMethod: () =>
    faker.helpers.arrayElement<Transaction["operationMethod"]>([
      "transfer",
      "direct_debit",
      "card",
      "cheque",
      "biller",
      "tax",
      "pagopa_payment",
    ]),
  side: () =>
    faker.helpers.arrayElement<Transaction["side"]>(["credit", "debit"]),
  status: () =>
    faker.helpers.arrayElement<Transaction["status"]>([
      "completed",
      "declined",
      "pending",
      "reversed",
    ]),
});
