"use client";

import { HeaderCell, Table, Row, Cell } from "@/components/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { getTransactions } from "@/services/transactions";
import { Checkbox } from "ui";

export function TransactionsTable() {
  const table = useReactTable({
    columns: columns,
    data: getTransactions(),
    getCoreRowModel: getCoreRowModel(),
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
        <Row>
          <Cell>
            <Checkbox />
          </Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
          <Cell>hi</Cell>
        </Row>
      </tbody>
    </Table>
  );
}
