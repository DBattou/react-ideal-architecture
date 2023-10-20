import { test, expect } from "@playwright/experimental-ct-react";
import { LoginForm } from ".";

test.describe(() => {
  test("renders login form", async ({ mount }) => {
    const component = await mount(<LoginForm />);

    // Disable screenshot until we use git LFS
    // await expect(component).toHaveScreenshot();

    await expect(
      component.getByRole("textbox", {
        name: "email",
      })
    ).toHaveValue("");

    await component
      .getByRole("textbox", {
        name: "email",
      })
      .fill("email@email.com");

    await expect(
      component.getByRole("textbox", {
        name: "password",
      })
    ).toHaveValue("");

    await component
      .getByRole("textbox", {
        name: "password",
      })
      .fill("password");
  });
});
