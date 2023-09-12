import type { AppProps } from 'next/app'
import styles from "./layout.module.css"
import "../styles/global.css"
import { makeServer } from "qonto-mirage";

makeServer({ environment: "development" });

export default function App({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <div className={styles["l-container__app"] }>
      <AnyComponent {...pageProps} />
    </div>
  )
}