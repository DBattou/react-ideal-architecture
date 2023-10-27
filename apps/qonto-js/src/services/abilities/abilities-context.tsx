import React, { createContext, useContext, useEffect, useState } from "react";
import type { AppContext, BankAccountAbilities } from "./bank-account";
import { buildBankAccountAbilities } from "./bank-account";

type AbilitiesContextType = {
  "bank-account": BankAccountAbilities;
};

const AbilitiesContext = createContext<AbilitiesContextType | undefined>(
  undefined
);

export const useAbilities = (
  resource: keyof AbilitiesContextType
): AbilitiesContextType[keyof AbilitiesContextType] | undefined => {
  const abilities = useContext(AbilitiesContext);
  if (abilities) {
    return abilities[resource];
  }
};

const getAppAbilities = (context: AppContext): AbilitiesContextType => {
  return {
    "bank-account": buildBankAccountAbilities(context),
    // list all app abilities
  };
};

type AbilitiesProviderProps = {
  children: React.ReactNode;
  context: AppContext;
};

export default function AbilitiesProvider({
  children,
  context,
}: AbilitiesProviderProps): JSX.Element {
  const [abilities, setAbilities] = useState<AbilitiesContextType>();

  useEffect(() => {
    setAbilities(getAppAbilities(context));
  }, [context]);

  return (
    <AbilitiesContext.Provider value={abilities}>
      {children}
    </AbilitiesContext.Provider>
  );
}
