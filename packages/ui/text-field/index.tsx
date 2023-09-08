import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Label } from "../label";
import styles from "./styles.module.css";
import cx from "classnames";

/* enforcing mandatory name and id here */
type TextFieldProps = {
  id: string;
  name: string;
  label: ReactNode;
  errorMessage?: string;
} & ComponentPropsWithoutRef<"input">;

export const TextField = ({
  label,
  errorMessage,
  id,
  required,
  className,
  type = "text",
  ...props
}: TextFieldProps) => {
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-4" isOptional={!required}>
        {label}
      </Label>
      <input
        id={id}
        aria-invalid={!!errorMessage}
        aria-errormessage={`${id}-error`}
        required={required}
        type={type}
        className={cx(styles.input, {
          [styles["input--error"]]: !!errorMessage,
        })}
        {...props}
      />
      <span
        id={`${id}-error`}
        className={cx(styles["error-message"], "caption")}
      >
        {errorMessage}
      </span>
    </div>
  );
};
