import { makeServer } from "qonto-mirage";
import { type ReactElement, type ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import AbilitiesProvider from "@/services/abilities/abilities-context";
import "@/styles/global.css";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

makeServer({ environment: process.env.NEXT_PUBLIC_ENV });

export default function App({
  Component,
  pageProps,
}: AppPropsWithLayout): JSX.Element {

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AbilitiesProvider
      context={{
        permissions: {
          teams: "access",
          bank_accounts: "create",
          savings: "access",
        },
      }}
    >
      {getLayout(<Component {...pageProps} />)}
    </AbilitiesProvider>
  );
}
