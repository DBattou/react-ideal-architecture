import type { AppProps } from 'next/app'
import styles from "./layout.module.css"
import "../styles/global.css"
 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={styles["l-container__app"] }>
      <Component {...pageProps} />
    </div>
  )
}