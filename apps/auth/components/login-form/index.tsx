import Link from "next/link";
import { Button, TextField } from "ui";
import cx from "classnames";
import type {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  FormEventHandler,
} from "react";
import { useState } from "react";
import { type UserCredentials, authenticate } from "@/services/session";
import styles from "./styles.module.css";

type LoginFormProps = ComponentPropsWithoutRef<"form">;

const INITIAL_ERRORS_STATE = {
  email: "",
  password: "",
};

export function LoginForm(props: LoginFormProps): JSX.Element {
  const [errors, setErrors] =
    useState<typeof INITIAL_ERRORS_STATE>(INITIAL_ERRORS_STATE);

  const clearErrors = (): void => {
    setErrors(INITIAL_ERRORS_STATE);
  };

  const handleLogin = async (credentials: UserCredentials): Promise<void> => {
    try {
      await authenticate(credentials);
    } catch (error) {
      if (
        error instanceof Error &&
        ["Unauthorized", "Not found"].includes(error.message)
      ) {
        setErrors((s) => ({
          ...s,
          password: "Your login credentials aren't correct. Try again.",
        }));
      }
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    void handleLogin({
      email: data.get("email") as string,
      password: data.get("password") as string,
    });
  };

  const handleChange: ChangeEventHandler<HTMLFormElement> = () => {
    clearErrors();
  };

  return (
    <form {...props} onChange={handleChange} onSubmit={handleSubmit}>
      <div className="mb-24">
        <TextField
          className="mb-16"
          errorMessage={errors.email}
          id="email"
          label="Email address"
          name="email"
          placeholder="Enter your email address"
          required
          type="email"
        />
        <TextField
          errorMessage={errors.password}
          id="password"
          label="Password"
          name="password"
          placeholder="Enter password"
          required
          type="password"
        />
      </div>
      <div className="controls">
        <Button type="submit" variant="primary">
          Sign in
        </Button>
        <Link
          className={cx(styles["password-lost-link"], "body-1", "ml-24")}
          href="passwords.forgot"
        >
          Forgot password?
        </Link>
      </div>
    </form>
  );
}
