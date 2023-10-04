import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "ui";

const meta = {
  title: "ui/select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        options: [
            {id: '1', label: 'Option 1', value: 1},
            {id: '2', label: 'Option 2', value: 2},
            {id: '3', label: 'Option 3', value: 3},
            {id: '4', label: 'Option 4', value: 4}
        ]
    }
};
