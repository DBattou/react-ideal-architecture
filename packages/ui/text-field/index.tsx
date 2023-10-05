import type { ComponentPropsWithoutRef, ReactNode } from "react";
import cx from "classnames";
import { Label } from "../label";
import styles from "./styles.module.css";

/* enforcing mandatory name and id here */
type TextFieldProps = {
  id: string;
  name: string;
  label: ReactNode;
  errorMessage?: string;
} & ComponentPropsWithoutRef<"input">;

export function TextField({
  label,
  errorMessage,
  id,
  required,
  className,
  type = "text",
  ...props
}: TextFieldProps): JSX.Element {
  return (
    <div className={className}>
      <Label className="mb-4" htmlFor={id} isOptional={!required}>
        {label}
      </Label>
      <input
        aria-errormessage={`${id}-error`}
        aria-invalid={Boolean(errorMessage)}
        className={cx(styles.input, {
          [styles["input--error"]]: Boolean(errorMessage),
        })}
        id={id}
        required={required}
        type={type}
        {...props}
      />
      <span
        className={cx(styles["error-message"], "caption")}
        id={`${id}-error`}
      >
        {errorMessage}
      </span>
    </div>
  );
}
