import type { AppProps } from 'next/app'
import styles from "./layout.module.css"
import "../styles/global.css"
import MirageServer from '@/components/mirage-server'
 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={styles["l-container__app"] }>
      <MirageServer />
      <Component {...pageProps} />
    </div>
  )
}