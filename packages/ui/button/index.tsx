import cx from "classnames";
import styles from "./styles.module.css";
import { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  variant?: "primary" | "danger" | "secondary" | "tertiary";
  size?: "small" | "large";
  stretch?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  variant,
  size,
  children,
  className,
  stretch,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cx(className, styles.btn, {
        [styles[`btn--${variant}`]]: !!variant,
        [styles[`btn--${size}`]]: !!size,
        [styles[`btn--stretch`]]: stretch,
      })}
      {...props}
    >
      {children}
    </button>
  );
};
