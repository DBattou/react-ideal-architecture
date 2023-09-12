import { columnHelper } from "./utils/helper";

export const methodColumn = columnHelper.accessor("operationMethod", {
  id: "method",
  header: "Method",
  cell: (info) => info.getValue(),
});
