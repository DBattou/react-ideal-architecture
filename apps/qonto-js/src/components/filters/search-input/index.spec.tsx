import sinon from "sinon";
import { test, expect } from "../../../../tests/helpers/test-ct";
import { SearchInput } from ".";

test.describe(() => {
  test("use defaultValue as an initial value", async ({ mount, page }) => {
    await mount(<SearchInput defaultValue="my default value" />);

    await expect(page.getByRole("textbox")).toHaveValue("my default value");
  });

  test("call onChange with the current text value", async ({ mount, page }) => {
    const changeHandlerSpy = sinon.spy();

    await mount(<SearchInput onChange={changeHandlerSpy} />);

    await page.getByRole("textbox").fill("cool");

    expect(changeHandlerSpy.calledOnceWith("cool")).toBeTruthy();
  });

  test("should display a placeholder when passed a placeholder prop", async ({
    mount,
    page,
  }) => {
    await mount(<SearchInput placeholder="my placeholder" />);

    await expect(page.getByPlaceholder("my placeholder")).toBeAttached();
  });
});
