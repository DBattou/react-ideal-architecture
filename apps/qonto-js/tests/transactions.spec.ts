import { transactionsPlayload } from "@/mocks/fixtures/transactions";
import { test, expect } from "./helpers/test";

test.describe('initial render', () => {
    test("transactions page display a search input and a transactions table", async ({
    page,
    mirageServer,
  }) => {
    mirageServer.create("transaction", {
      // @ts-expect-error fix issue with mirage model registry
      counterpartyName: "Left Behind",
    });

    await page.goto("/transactions");

    await expect(page.getByPlaceholder("Search transactions...")).toBeVisible();

    await expect(
      page.getByRole("table", { name: "List of transactions" })
    ).toBeVisible();

    await expect(page.getByRole("cell", { name: "Left Behind" })).toBeVisible();
  });

  test("search input should initially be filled with the query search parameter", async ({
    page,
  }) => {
    await page.goto("/transactions?query=initial+value");

    await expect(page.getByPlaceholder("Search transactions...")).toHaveValue(
      "initial value"
    );
  });

  test("transactions table should be sorted according to the sort_by search parameter", async ({
    page,
  }) => {
    await page.goto("/transactions?sort_by=amount%3Aasc");

    await expect(
      page.getByRole("columnheader", {
        name: "Amount 🔼",
      })
    ).toHaveAttribute("aria-sort", "ascending");
  });

  test("transactions should show n items per page according to the per_page search parameter", async ({
    page,
  }) => {
    await page.goto("/transactions?per_page=50");

    await expect(
      page.getByRole("button", {
        name: "Display 50 items per page",
      })
    ).toHaveAttribute("aria-pressed", "true");
  });
});

test.describe("interactions", () => {
  test("inputting a search query from the search input should set the query search parameter", async ({
    page,
  }) => {
    await page.goto("/transactions");

    await page.getByPlaceholder("Search transactions...").fill("my query");

    await expect(page).toHaveURL("/transactions?query=my+query");
  });

  test("inputing a search query from the search input should clear the page search parameter", async ({
    page,
  }) => {
    await page.goto("/transactions?page=2");

    await page.getByPlaceholder("Search transactions...").fill("my query");

    await expect(page).toHaveURL("/transactions?query=my+query");
  });

  test('clicking on a "per_page" button should update the per_page search parameter', async ({
    page,
  }) => {
    await page.goto("/transactions");

    await page
      .getByRole("button", {
        name: "Display 50 items per page",
      })
      .click();

    await expect(page).toHaveURL("/transactions?per_page=50");
  });

  test('clicking on a "per_page" button should reset the page search parameter', async ({
    page,
  }) => {
    await page.goto("/transactions?page=2");

    await page
      .getByRole("button", {
        name: "Display 50 items per page",
      })
      .click();

    await expect(page).toHaveURL("/transactions?per_page=50");
  });

  test('clicking on a "page" button should set the page search parameter', async ({
    page,
  }) => {
    await page.route("*/**/api/v6/transactions/search", async (route) => {
      const json = transactionsPlayload;
      await route.fulfill({ json });
    });

    await page.goto("/transactions");

    await page
      .getByRole("button", {
        name: "Next page of items",
      })
      .click();

    await expect(page).toHaveURL("/transactions?page=2");
  });
});
