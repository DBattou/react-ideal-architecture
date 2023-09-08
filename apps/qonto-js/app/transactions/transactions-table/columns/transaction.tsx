import { columnHelper } from "./utils/helper";
import { TransactionCell } from "../transaction-cell";

export const transactionColumn = columnHelper.accessor("counterpartyName", {
  id: "transaction",
  header: "Transaction",
  cell: (info) => {
    const counterpartyName = info.getValue();
    const { status, activityTag } = info.row.original;

    return (
      <TransactionCell
        counterpartyName={counterpartyName}
        status={status}
        activityTag={activityTag}
      />
    );
  },
});
