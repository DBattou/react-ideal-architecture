import { test, expect } from "@playwright/experimental-ct-react";
import type { HooksConfig } from "../../../playwright";
import { Filters } from ".";

test("displays a search bar", async ({ mount, page }) => {
  await mount<HooksConfig>(<Filters />, {
    hooksConfig: { enableRouting: true },
  });
  await expect(page.getByPlaceholder("Search transactions...")).toBeAttached();
});
