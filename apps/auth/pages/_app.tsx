import type { AppProps } from 'next/app'
import styles from "./layout.module.css"
import "../styles/global.css"
import { makeServer } from "qonto-mirage";
 
export default function App({ Component, pageProps }: AppProps) {
  makeServer({ environment: "development" });
  const AnyComponent = Component as any;
  return (
    <div className={styles["l-container__app"] }>
      <AnyComponent {...pageProps} />
    </div>
  )
}