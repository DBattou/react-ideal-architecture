import { AbilityBuilder, createMongoAbility } from "@casl/ability";

export type BankAccountAbilities = {
  canView: boolean;
  canCreate: boolean;
};

type Permissions = {
  teams: "access" | "create" | "delete"; // Example values, adjust as needed
  bank_accounts: "create" | "access" | "update" | "delete"; // Example values, adjust as needed
  savings: "access" | "create" | "delete"; // Example values, adjust as needed
};

export type AppContext = {
  permissions: Permissions;
};

export const buildBankAccountAbilities = (
  context: AppContext
): BankAccountAbilities => {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  if (context.permissions.bank_accounts === "access") {
    can("view", "BankAccount");
  }

  if (context.permissions.bank_accounts === "create") {
    can("create", "BankAccount");
  }

  const abilities = build();

  return {
    canView: abilities.can("view", "BankAccount"),
    canCreate: abilities.can("create", "BankAccount"),
  };
};
