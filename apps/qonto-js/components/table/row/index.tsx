import { ComponentPropsWithoutRef } from "react";
import cx from "classnames";
import styles from "./styles.module.css";

type RowProps = ComponentPropsWithoutRef<"tr">;

export function Row({ className, children, ...props }: RowProps) {
  return (
    <tr className={cx(styles.row, className)} {...props}>
      {children}
    </tr>
  );
}
