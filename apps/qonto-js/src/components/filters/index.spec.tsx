import { test, expect } from "@playwright/experimental-ct-react";
import { Filters } from ".";

test.describe(() => {
  test("displays a search bar", async ({ mount, page }) => {
    await mount(<Filters />);
    await expect(
      page.getByPlaceholder("Search transactions...")
    ).toBeAttached();
  });
});
