import { columnHelper } from "./utils/helper";

export const operationMethodColumn = columnHelper.accessor("operationMethod", {
  id: "operation_method",
  header: "Method",
  cell: (info) => info.getValue(),
});
