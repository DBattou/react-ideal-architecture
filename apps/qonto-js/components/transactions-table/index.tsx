import { Cell, HeaderCell, Row, Table } from "@/components/table";
import type {
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const columnIDsByParam = {
  query: "transaction",
};

export function TransactionsTable({ transactions }) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const params = useSearchParams();

  const columnFilters = useMemo<ColumnFiltersState>(() => {
    let filters = [];

    params.forEach((value, key) => {
      let id = columnIDsByParam[key];
      if (id) {
        filters.push({ id, value });
      }
    });

    return filters;
  }, [params.toString()]);

  const table = useReactTable({
    columns: columns,
    data: transactions,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      rowSelection,
      sorting,
      columnFilters,
    },
  });
  return (
    <Table caption="List of transactions">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <HeaderCell
                key={header.id}
                isSortable={header.column.getCanSort()}
                onSort={header.column.getToggleSortingHandler()}
                isSorted={header.column.getIsSorted()}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </HeaderCell>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Cell>
            ))}
          </Row>
        ))}
      </tbody>
    </Table>
  );
}
