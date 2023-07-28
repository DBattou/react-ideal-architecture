import { LabelHTMLAttributes } from "react";
import cx from "classnames";
import styles from "./styles.module.css";

type LabelProps = {
  isOptional: boolean;
} & LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({
  isOptional,
  children,
  className,
  ...props
}: LabelProps) => {
  return (
    <label className={cx(styles.label, className)} {...props}>
      {children}
      {isOptional && " (optional)"}
    </label>
  );
};
