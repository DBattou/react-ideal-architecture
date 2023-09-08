import { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.css";
import cx from "classnames";

type TableProps = {
  caption: string;
} & ComponentPropsWithoutRef<"table">;

export function Table({ caption, className, children, ...props }: TableProps) {
  return (
    <table className={cx(styles.table, className)} {...props}>
      <caption className="sr-only">{caption}</caption>
      {children}
    </table>
  );
}
