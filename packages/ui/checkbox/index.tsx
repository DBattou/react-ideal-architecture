"use client";

import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import cx from "classnames";
import styles from "./styles.module.css";

type CheckboxProps = ComponentPropsWithoutRef<"input"> & {
  indeterminate?: boolean;
  type?: never;
};

export function Checkbox({
  indeterminate = false,
  className,
  ...props
}: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={cx(styles.checkbox, "overlay", className)}
      {...props}
    />
  );
}
