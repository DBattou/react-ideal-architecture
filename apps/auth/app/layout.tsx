import { MockServer } from "../providers/mock-server";
import "../styles/global.css";
import styles from "./layout.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <MockServer />
      <html lang="en">
        <body>
          <div className={styles["l-container__app"]}>{children}</div>
        </body>
      </html>
    </>
  );
}
