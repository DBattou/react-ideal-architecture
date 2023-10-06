import cx from "classnames";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

type StatusTagProps = {
  color: "green" | "red" | "purple" | "orange" | "gray";
  children: ReactNode;
  className?: string;
};

export function StatusTag({
  children,
  className,
  color,
}: StatusTagProps): JSX.Element {
  return (
    <span className={cx(styles.statusTag, styles[color], className)}>
      {children}
    </span>
  );
}
