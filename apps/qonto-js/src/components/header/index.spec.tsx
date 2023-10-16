import { test, expect } from "../../../tests/helpers/test-ct";
import { Header } from ".";

test("renders the title", async ({ mount }) => {
  const header = await mount(<Header title="My title" />);
  await expect(header.getByRole("heading", { level: 1 })).toContainText(
    "My title"
  );
});
