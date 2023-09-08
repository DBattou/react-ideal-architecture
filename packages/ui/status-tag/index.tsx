import cx from "classnames";
import styles from "./styles.module.css";
import { ReactNode } from "react";

type StatusTagProps = {
  color: "green" | "red" | "purple" | "orange" | "gray";
  children: ReactNode;
  className?: string;
};

export function StatusTag({ children, className, color }: StatusTagProps) {
  return (
    <span className={cx(styles.statusTag, styles[color], className)}>
      {children}
    </span>
  );
}
