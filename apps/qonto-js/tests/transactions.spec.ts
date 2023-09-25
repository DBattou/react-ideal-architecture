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

test("Search input should initially be filled with the 'query' QP", async ({
  page,
}) => {
  await page.goto("/transactions?query=initial+value");

  let searchInput = await page.getByPlaceholder("Search transactions...");

  await expect(searchInput).toHaveValue("initial value");
});

test("Transactions table should be sorted according to the sort_by QP", async ({
  page,
}) => {
  await page.goto("/transactions?sort_by=amount%3Aasc");

  let amountColumn = await page.getByRole("columnheader", {
    name: "Amount 🔼",
  });

  await expect(amountColumn).toHaveAttribute("aria-sort", "ascending");
});

test("Transactions should show n items per page according to the per_page QP", async ({
  page,
}) => {
  await page.goto("/transactions?per_page=50");

  await expect(
    await page.getByRole("button", {
      name: "Display 50 items per page",
    })
  ).toHaveAttribute("aria-pressed", "true");
});
