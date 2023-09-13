import { Cell, HeaderCell, Row, Table } from "@/components/table";
import type { RowSelectionState, SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { useState } from "react";

export function TransactionsTable({ transactions, onSortingChange, sorting }) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    columns: columns,
    data: transactions,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualSorting: true,
    enableSortingRemoval: false,
    state: {
      rowSelection,
      sorting,
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
