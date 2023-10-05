import type { AppProps } from "next/app";
import { makeServer } from "qonto-mirage";
import styles from "./layout.module.css";
import "../styles/global.css";

makeServer({ environment: "development" });

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className={styles["l-container__app"]}>
      <Component {...pageProps} />
    </div>
  );
}
