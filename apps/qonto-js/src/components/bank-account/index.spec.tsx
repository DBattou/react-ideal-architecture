import { test, expect } from "../../../tests/helpers/test-ct";
import type { AppContext } from "../../services/abilities/bank-account";
import { buildBankAccountAbilities } from "../../services/abilities/bank-account";
import { AbilitiesProvider } from "../../services/abilities/abilities-context";
import { BankAccount } from ".";

const defaultContext: AppContext = {
  permissions: {
    teams: "access",
    bank_accounts: "create",
    savings: "access",
  },
};

test.describe(() => {
  test("buildBankAccountAbilities", () => {
    const { canView: canView1, canCreate: canCreate1 } =
      buildBankAccountAbilities(defaultContext);
    expect(canView1).toBeFalsy();
    expect(canCreate1).toBeTruthy();

    const { canView: canView2, canCreate: canCreate2 } =
      buildBankAccountAbilities({
        permissions: {
          ...defaultContext.permissions,
          bank_accounts: "access",
        },
      });

    expect(canView2).toBeTruthy();
    expect(canCreate2).toBeFalsy();
  });

  test("bankAccount component should render correctly based on abilities", async ({
    mount,
  }) => {
    const component1 = await mount(
      <AbilitiesProvider context={defaultContext}>
        <BankAccount />
      </AbilitiesProvider>
    );

    await expect(component1.getByRole("heading", { level: 2 })).toContainText(
      "Create a new account"
    );
  });
});
