import type { Meta, StoryObj } from "@storybook/react";

import { StatusTag } from "ui";

const meta = {
  title: "ui/status-stag",
  component: StatusTag,
  tags: ["autodocs"],
} satisfies Meta<typeof StatusTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Hello",
    color: "green",
  },
};
