"use client";

import { Cell, HeaderCell, Row, Table } from "@/components/table";
import type { RowSelectionState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { getTransactions } from "@/services/transactions";
import { useState } from "react";

export function TransactionsTable() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    columns: columns,
    data: getTransactions(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
    },
  });
  return (
    <Table caption="List of transactions">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <HeaderCell key={header.id} isSortable={false}>
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
