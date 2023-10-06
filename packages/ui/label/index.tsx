import type { ComponentPropsWithoutRef } from "react";
import cx from "classnames";
import styles from "./styles.module.css";

type LabelProps = {
  isOptional: boolean;
} & ComponentPropsWithoutRef<"label">;

export function Label({
  isOptional,
  children,
  className,
  ...props
}: LabelProps): JSX.Element {
  return (
    <label className={cx(styles.label, className)} {...props}>
      {children}
      {isOptional ? " (optional)" : null}
    </label>
  );
}
