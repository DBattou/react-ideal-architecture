import type { ComponentPropsWithoutRef } from "react";
import cx from "classnames";
import styles from "./styles.module.css";

type TableProps = {
  caption: string;
} & ComponentPropsWithoutRef<"table">;

export function Table({
  caption,
  className,
  children,
  ...props
}: TableProps): JSX.Element {
  return (
    <table className={cx(styles.table, className)} {...props}>
      <caption className="sr-only">{caption}</caption>
      {children}
    </table>
  );
}
