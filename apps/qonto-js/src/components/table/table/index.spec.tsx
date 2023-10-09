import { test, expect } from "@playwright/experimental-ct-react";
import { Table } from "./index";

test("renders Table component with the proper caption", async ({
  mount,
  page,
}) => {
  await mount(<Table caption="My caption" />);
  await expect(page.getByRole("table", { name: "My caption" })).toBeAttached();
});
