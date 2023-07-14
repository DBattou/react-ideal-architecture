import 'normalize.css/normalize.css';
import "ui/global-styles/variables.css"
import "ui/global-styles/typo.css"
import "ui/global-styles/font-system.css"
import "ui/global-styles/margin-helpers.css"
import "ui/global-styles/colors/base-palette/token.css"
import "ui/global-styles/colors/light-theme/token.css"
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
