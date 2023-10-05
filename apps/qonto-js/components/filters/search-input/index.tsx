import type { ChangeEventHandler } from "react";
import cx from "classnames";
import styles from "./styles.module.css";

type SearchInputProps = {
  className?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  defaultValue?: string;
};

export function SearchInput({
  className,
  defaultValue,
  onChange,
  placeholder,
}: SearchInputProps): JSX.Element {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event.currentTarget.value);
  };

  return (
    <div className={cx(styles.container, className)}>
      <span className={styles.icon}>🔍</span>
      <input
        className={styles.bar}
        defaultValue={defaultValue}
        onChange={handleChange}
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
}
