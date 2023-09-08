import { ComponentPropsWithoutRef } from "react";
import cx from "classnames";
import styles from "./styles.module.css";

type CellProps = ComponentPropsWithoutRef<"td">;

export function Cell({ className, children, ...props }: CellProps) {
  return (
    <td className={cx(styles.cell, className)} {...props}>
      <div className={styles.cellContent}>{children}</div>
    </td>
  );
}
