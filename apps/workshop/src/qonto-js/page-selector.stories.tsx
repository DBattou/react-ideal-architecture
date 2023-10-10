import type { Meta, StoryObj } from "@storybook/react";
import { PageSelector } from "qonto-js/src/components/page-selector";

const meta = {
  title: "qonto-js/page-selector",
  component: PageSelector,
  tags: ["autodocs"],
  argTypes: {
    onPageChange: { action: "page selected" },
    onPerPageChange: { action: "per_page selected" },
  },
} satisfies Meta<typeof PageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    page: 1,
    perPage: 25,
    totalCount: 100,
  },
};
