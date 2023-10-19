import { test, expect } from "./helpers/test";

test("Transactions page display a search input and a transactions table", async ({
  page,
}) => {
  await page.goto("/transactions");

  await expect(page.getByPlaceholder("Search transactions...")).toBeVisible();

  await expect(
    page.getByRole("table", { name: "List of transactions" })
  ).toBeVisible();

  await expect(page.getByRole("cell", { name: "Left Behind" })).toBeVisible();
});

test("Inputting a search query from the search input should set the query QP in url", async ({
  page,
}) => {
  await page.goto("/transactions");

  await page.getByPlaceholder("Search transactions...").fill("my query");

  await expect(page).toHaveURL("/transactions?query=my+query");
});

test("Inputing a search query from the search input should clear the page QP in url", async ({
  page,
}) => {
  await page.goto("/transactions?page=2");

  await page.getByPlaceholder("Search transactions...").fill("my query");

  await expect(page).toHaveURL("/transactions?query=my+query");
});

test("Search input should initially be filled with the 'query' QP", async ({
  page,
}) => {
  await page.goto("/transactions?query=initial+value");

  await expect(page.getByPlaceholder("Search transactions...")).toHaveValue(
    "initial value"
  );
});

test("Transactions table should be sorted according to the sort_by QP", async ({
  page,
}) => {
  await page.goto("/transactions?sort_by=amount%3Aasc");

  await expect(
    page.getByRole("columnheader", {
      name: "Amount 🔼",
    })
  ).toHaveAttribute("aria-sort", "ascending");
});

test("Transactions should show n items per page according to the per_page QP", async ({
  page,
}) => {
  await page.goto("/transactions?per_page=50");

  await expect(
    page.getByRole("button", {
      name: "Display 50 items per page",
    })
  ).toHaveAttribute("aria-pressed", "true");
});
