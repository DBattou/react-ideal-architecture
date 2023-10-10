import { AmountCell } from "../amount-cell";
import { columnHelper } from "./utils/helper";

export const amountColumn = columnHelper.accessor(
  (data) => {
    if (data.side === "credit") {
      return data.amount;
    }
    return -1 * data.amount;
  },
  {
    id: "amount",
    header: "Amount",
    cell: (info) => {
      const value = info.getValue();
      return <AmountCell value={value} />;
    },
  }
);
