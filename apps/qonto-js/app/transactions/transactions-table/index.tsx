import { Cell, HeaderCell, Row, Table } from "@/components/table";
import { Checkbox } from "ui";

export function TransactionsTable() {
  return (
    <Table caption="List of transactions">
      <thead>
        <tr>
          <HeaderCell isSortable={false}>
            <Checkbox />
          </HeaderCell>
          <HeaderCell isSortable={true} isSorted={false}>
            Transaction
          </HeaderCell>
          <HeaderCell isSortable={true} isSorted={false}>
            Method
          </HeaderCell>
          <HeaderCell isSortable={true} isSorted="desc">
            Operation Date
          </HeaderCell>
          <HeaderCell isSortable={false}>Attachment</HeaderCell>
          <HeaderCell isSortable={true} isSorted={false}>
            Amount
          </HeaderCell>
        </tr>
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
