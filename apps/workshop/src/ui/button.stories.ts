import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "ui";

const meta = {
  title: "ui/button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};
