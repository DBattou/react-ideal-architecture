import "./styles/global.css";
import styles from './layout.module.css';
import MirageServer from "@/components/mirage-server";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MirageServer />
      <html lang="en">
        <body className={styles.app}>
          <div className={styles['l-container__app']}>
            
            {children}
          </div> 
        </body>
      </html>
    </>
  );
}
