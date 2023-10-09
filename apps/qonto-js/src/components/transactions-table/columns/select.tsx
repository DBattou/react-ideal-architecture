import { Checkbox } from "ui";
import { columnHelper } from "./utils/helper";

export const selectColumn = columnHelper.display({
  id: "select",
  header: ({ table }) => {
    return (
      <Checkbox
        aria-label="Select all transactions on this page"
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    );
  },
  cell: ({ row }) => {
    return (
      <Checkbox
        aria-label="Select transaction"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    );
  },
});
