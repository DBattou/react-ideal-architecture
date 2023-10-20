import { test, expect } from "@playwright/test";

test.describe(() => {
  test("login page has a heading", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Welcome back!"
    );

    await expect(page.getByLabel("Email address")).toHaveValue("");
    await expect(page.getByLabel("Password")).toHaveValue("");

    await expect(page.getByRole("button")).toHaveText("Sign in");

    await expect(
      page.getByRole("link", { name: "Forgot password?" })
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: "Open an account" })
    ).toBeVisible();
  });
});
