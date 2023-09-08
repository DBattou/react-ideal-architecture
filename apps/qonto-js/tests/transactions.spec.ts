import { test, expect } from "@playwright/test";

test("Transactions page display a search input and a transactions table", async ({
  page,
}) => {
  await page.goto("/transactions");

  await expect(page.getByPlaceholder("Search transactions...")).toBeVisible();

  await expect(
    page.getByRole("table", { name: "List of transactions" })
  ).toBeVisible();
});

test("Inputing a search query from the search input should update the url", async ({
  page,
}) => {
  await page.goto("/transactions");

  let searchInput = await page.getByPlaceholder("Search transactions...");

  await searchInput.fill("my query");

  await expect(page).toHaveURL("/transactions?query=my+query");
});
