import { makeServer } from "qonto-mirage";
import { type ReactElement, type ReactNode, useMemo } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@/styles/global.css";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

makeServer({ environment: process.env.NEXT_ENV });

export default function App({
  Component,
  pageProps,
}: AppPropsWithLayout): JSX.Element {
  const queryClient = useMemo(() => new QueryClient(), []);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} />)}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
