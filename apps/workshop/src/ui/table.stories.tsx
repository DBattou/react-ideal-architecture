import type { Meta, StoryObj } from "@storybook/react";
import { Table, HeaderCell, Cell, Row } from "ui";
import {
  WithAscSort,
  Default as DefaultHeaderCell,
  WithDescSort,
} from "./table/header-cell.stories";

const meta = {
  title: "qonto-js/table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { caption: "My table" },
  render(args) {
    return (
      <Table {...args}>
        <thead>
          <tr>
            <HeaderCell {...DefaultHeaderCell.args} />
            <HeaderCell {...WithDescSort.args} />
            <HeaderCell {...WithAscSort.args} />
          </tr>
        </thead>
        <tbody>
          <Row>
            <Cell>My cell #1</Cell>
            <Cell>My cell #2</Cell>
            <Cell>My cell #3</Cell>
          </Row>

          <Row>
            <Cell>My cell #1</Cell>
            <Cell>My cell #2</Cell>
            <Cell>My cell #3</Cell>
          </Row>

          <Row>
            <Cell>My cell #1</Cell>
            <Cell>My cell #2</Cell>
            <Cell>My cell #3</Cell>
          </Row>
        </tbody>
      </Table>
    );
  },
};
