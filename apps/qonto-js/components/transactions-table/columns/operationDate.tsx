import { columnHelper } from "./utils/helper";

export const operationDateColumn = columnHelper.accessor("emittedAt", {
  id: "operationDate",
  header: "Operation date",
  cell: (info) =>
    info.getValue().toLocaleString("en-US", {
      dateStyle: "medium",
    }),
});
