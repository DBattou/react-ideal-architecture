import "./styles/global.css";
import styles from './layout.module.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={styles.app}>
        <div className={styles['l-container__app']}>
          {children}
        </div> 
      </body>
    </html>
  );
}
