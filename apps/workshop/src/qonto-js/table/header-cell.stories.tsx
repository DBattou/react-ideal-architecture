import type { Meta, StoryObj } from "@storybook/react";
import { HeaderCell } from "qonto-js/src/components/table";

const meta = {
  title: "qonto-js/table/header-cell",
  component: HeaderCell,
  tags: ["autodocs"],
  argTypes: { onSort: { action: "sorted !" } },
} satisfies Meta<typeof HeaderCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Header cell !", isSortable: false },
};

export const WithAscSort: Story = {
  args: {
    children: "Header cell with ascending sort !",
    isSortable: true,
    isSorted: "asc",
  },
};

export const WithDescSort: Story = {
  args: {
    children: "Header cell with descending sort !",
    isSortable: true,
    isSorted: "desc",
  },
};
