import { TransactionCell } from "../transaction-cell";
import { columnHelper } from "./utils/helper";

export const counterpartyNameColumn = columnHelper.accessor(
  "counterpartyName",
  {
    id: "counterparty_name",
    header: "Transaction",
    cell: (info) => {
      const counterpartyName = info.getValue();
      const { status, activityTag } = info.row.original;

      return (
        <TransactionCell
          activityTag={activityTag}
          counterpartyName={counterpartyName}
          status={status}
        />
      );
    },
  }
);
