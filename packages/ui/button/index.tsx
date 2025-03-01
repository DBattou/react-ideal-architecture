/* eslint-disable react/button-has-type */
import cx from "classnames";
import type { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.css";

export type ButtonProps = {
  /**
   * ### Optional button variant
   * Controls variant styles of the button
   * - `"primary"` has a high emphasis level
   * - `"danger"` has a high emphasis level
   * - `"secondary"` (default) has a medium emphasis level
   * - `"tertiary"` has a low emphasis level
   */
  variant?: "primary" | "danger" | "secondary" | "tertiary";
  /**
   * ### Optional size modifier
   * Controls size styles of the button
   * - `"small"` the button will use its "small" style modifier
   * - `"medium"` (default) the button will use its "medium" style modifier
   * - `"large"` the button will use its "large" style modifier
   */
  size?: "small" | "medium" | "large";
  /**
   * ### Optional stretch modifier
   * Toggles stretch mode of the button
   * - `true` the button will take all the available width
   * - `false` (default) the button's width will match its content
   */
  stretch?: boolean;
} & ComponentPropsWithoutRef<"button">;

export function Button({
  variant = "secondary",
  size = "medium",
  children,
  className,
  stretch = false,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={cx(className, styles.btn, {
        [styles[`btn--${variant}`]]: variant !== "secondary",
        [styles[`btn--${size}`]]: size !== "medium",
        [styles[`btn--stretch`]]: stretch,
      })}
      {...props}
    >
      {children}
    </button>
  );
}
