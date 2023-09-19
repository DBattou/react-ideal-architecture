import type { AppProps } from "next/app";
import { makeServer } from "qonto-mirage";
import "@/styles/global.css";

makeServer({ environment: "development" });

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
