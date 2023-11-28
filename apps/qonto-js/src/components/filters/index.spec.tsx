import sinon from "sinon";
import { test, expect } from "@playwright/experimental-ct-react";
import { Filters } from ".";

test.describe("query input", () => {
  test("displays a search bar", async ({ mount, page }) => {
    await mount(<Filters />);
    await expect(
      page.getByPlaceholder("Search transactions...")
    ).toBeAttached();
  });

  test("should use initialQuery to prefill the input value", async ({
    mount,
    page,
  }) => {
    await mount(<Filters initialQuery="wassup" />);

    await expect(page.getByPlaceholder("Search transactions...")).toHaveValue(
      "wassup"
    );
  });

  test("should call onQueryChange when typing in the search bar", async ({
    mount,
    page,
  }) => {
    const queryChangeHandler = sinon.spy();

    await mount(<Filters onQueryChange={queryChangeHandler} />);

    await page.getByPlaceholder("Search transactions...").fill("Yay");

    expect(queryChangeHandler.calledOnceWith("Yay")).toBeTruthy();
  });
});
