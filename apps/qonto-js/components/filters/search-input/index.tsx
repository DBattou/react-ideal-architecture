import styles from "./styles.module.css";
import cx from "classnames";

type SearchInputProps = {
  className?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
};

export function SearchInput({
  className,
  defaultValue,
  onChange,
  value,
  placeholder,
}: SearchInputProps) {
  const handleChange = (event) => {
    onChange?.(event.currentTarget.value);
  };

  return (
    <div className={cx(styles.container, className)}>
      <span className={styles.icon}>🔍</span>
      <input
        className={styles.bar}
        onChange={handleChange}
        placeholder={placeholder}
        type="text"
        value={value}
        defaultValue={defaultValue}
      />
    </div>
  );
}
