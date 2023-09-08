import { test, expect } from "@playwright/test";

test("login page has a heading", async ({ page }) => {
  await page.goto("/");

  let lottieAnimation = await page.getByTestId("lottie-signin-animation");

  // Disable screenshot until we use git LFS
  //   await expect(page).toHaveScreenshot({
  //     animations: 'disabled',
  //     mask: [lottieAnimation],
  //   });

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
