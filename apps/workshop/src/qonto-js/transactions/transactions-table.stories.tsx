import type { Meta, StoryObj } from "@storybook/react";
import { TransactionsTable } from "qonto-js-transactions-ui";

const meta = {
  title: "qonto-js/transactions/transactions-table",
  component: TransactionsTable,
  tags: ["autodocs"],
} satisfies Meta<typeof TransactionsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    transactions: [
      {
        id: "0",
        counterpartyName: "Dunder Mifflin Paper Company, Inc.",
        operationMethod: "transfer",
        emittedAt: new Date(),
        amount: 50,
        side: "credit",
        activityTag: "other_expense",
        status: "completed",
      },
      {
        id: "1",
        counterpartyName: "Acme, Inc.",
        operationMethod: "transfer",
        emittedAt: new Date(),
        amount: 35,
        side: "debit",
        activityTag: "other_expense",
        status: "declined",
      },
    ],
    sorting: [],
  },
};
