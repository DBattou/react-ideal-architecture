import type {
  OnChangeFn,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Cell, HeaderCell, Row, Table } from "ui";
import type { Transaction } from "qonto-api";
import { columns } from "./columns";

type TransactionsTableProps = {
  transactions: Transaction[];
  onSortingChange: OnChangeFn<SortingState>;
  sorting: SortingState;
};

export function TransactionsTable({
  transactions,
  onSortingChange,
  sorting,
}: TransactionsTableProps): JSX.Element {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    columns,
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
                isSortable={header.column.getCanSort()}
                isSorted={header.column.getIsSorted()}
                key={header.id}
                onSort={header.column.getToggleSortingHandler()}
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
