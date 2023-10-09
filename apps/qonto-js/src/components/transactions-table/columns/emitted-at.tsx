import { columnHelper } from "./utils/helper";

export const emittedAtColumn = columnHelper.accessor("emittedAt", {
  id: "emitted_at",
  header: "Operation date",
  cell: (info) =>
    info.getValue().toLocaleString("en-US", {
      dateStyle: "medium",
    }),
});
