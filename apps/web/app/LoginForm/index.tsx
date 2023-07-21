import Link from "next/link";
import { Button } from "ui";
import styles from "./styles.module.css";
import cx from "classnames";
import { FormHTMLAttributes } from "react";


type LoginFormProps = FormHTMLAttributes<HTMLFormElement>

export const LoginForm = (props: LoginFormProps) => {
  return (
    <form {...props}>
      <div className="controls">
        <Button type="submit" variant="primary">
          Sign in
        </Button>
        <Link
          href="passwords.forgot"
          className={cx(styles["password-lost-link"], "body-1", "ml-24")}
        >
          Forgot password?
        </Link>
      </div>
    </form>
  );
};
