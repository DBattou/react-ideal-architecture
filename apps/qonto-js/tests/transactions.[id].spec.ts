import { test, expect } from "./helpers/test";

test.describe("initial render", () => {
  test("transactions/[id] page display a sidebar with the current transaction details", async ({
    page,
  }) => {
    await page.goto("/transactions/12");

    await expect(page.getByText("Details for transaction 12")).toBeVisible();
  });
});
