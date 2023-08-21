"use client";
import Link from "next/link";
import { Button, TextField } from "ui";
import styles from "./styles.module.css";
import cx from "classnames";
import { FormEvent, FormHTMLAttributes, useState } from "react";
import { authenticate } from "../../services/session";

type LoginFormProps = FormHTMLAttributes<HTMLFormElement>;

const INITIAL_ERRORS_STATE = {
  email: "",
  password: "",
};

export const LoginForm = (props: LoginFormProps) => {
  const [errors, setErrors] =
    useState<typeof INITIAL_ERRORS_STATE>(INITIAL_ERRORS_STATE);

  const clearErrors = () => setErrors(INITIAL_ERRORS_STATE);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    try {
      await authenticate({
        email: data.get("email") as string,
        password: data.get("password") as string,
      });
    } catch (error) {
      if (['Unauthorized', 'Not found'].includes(error.message)) {
        setErrors((s) => ({
          ...s,
          password: "Your login credentials aren't correct. Try again."
        }));
      }
    }
  };

  const handleChange = () => {
     clearErrors()
  }

  return (
    <form {...props} onSubmit={handleSubmit} onChange={handleChange}>
      <div className="mb-24">
        <TextField
          label="Email address"
          placeholder="Enter your email address"
          className="mb-16"
          name="email"
          id="email"
          type="email"
          required
          errorMessage={errors.email}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          required
          name="password"
          id="password"
          type="password"
          errorMessage={errors.password}
        />
      </div>
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
