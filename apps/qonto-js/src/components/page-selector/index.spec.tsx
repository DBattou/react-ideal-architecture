import sinon from "sinon";
import { test, expect } from "../../../tests/helpers/test-ct";
import { PageSelector } from "./index";

test("should disable previous page button when on the first page", async ({
  mount,
  page,
}) => {
  const pageChangeSpy = sinon.spy();

  await mount(
    <PageSelector
      onPageChange={pageChangeSpy}
      page={1}
      perPage={25}
      totalCount={100}
    />
  );

  await expect(
    page.getByRole("button", { name: "Previous page of items" })
  ).toBeDisabled();
});

test("should disable next page button when on the last page", async ({
  mount,
  page,
}) => {
  const pageChangeSpy = sinon.spy();

  await mount(
    <PageSelector
      onPageChange={pageChangeSpy}
      page={4}
      perPage={25}
      totalCount={100}
    />
  );

  await expect(
    page.getByRole("button", { name: "Next page of items" })
  ).toBeDisabled();
});

test("call onPageChange on click on the next page button", async ({
  mount,
  page,
}) => {
  const pageChangeSpy = sinon.spy();

  await mount(
    <PageSelector
      onPageChange={pageChangeSpy}
      page={1}
      perPage={25}
      totalCount={100}
    />
  );

  await page.getByRole("button", { name: "Next page of items" }).click();

  expect(pageChangeSpy.calledOnceWith(2)).toBeTruthy();
});

test("call onPerPageChange on click on the per_page change button", async ({
  mount,
  page,
}) => {
  const pageChangeSpy = sinon.spy();
  const perPageChangeSpy = sinon.spy();

  await mount(
    <PageSelector
      onPageChange={pageChangeSpy}
      onPerPageChange={perPageChangeSpy}
      page={1}
      perPage={25}
      totalCount={100}
    />
  );

  await page.getByRole("button", { name: "Display 50 items per page" }).click();

  expect(perPageChangeSpy.calledOnceWith(50)).toBeTruthy();
});

test("should display current list meta properly", async ({ mount, page }) => {
  const pageChangeSpy = sinon.spy();

  await mount(
    <PageSelector
      onPageChange={pageChangeSpy}
      page={2}
      perPage={10}
      totalCount={200}
    />
  );

  await expect(page.getByText("11-20 of 200")).toBeVisible();
});
