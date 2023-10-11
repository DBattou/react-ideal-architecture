import cx from "classnames";
import styles from "./styles.module.css";

type AmountCellProps = {
  value: number;
};

export function AmountCell({ value }: AmountCellProps): JSX.Element {
  return (
    <span className={cx(styles.amount, { [styles.credit]: value > 0 })}>
      {value.toLocaleString("en-US", {
        style: "currency",
        currency: "EUR",
        currencyDisplay: "code",
        signDisplay: "always",
      })}
    </span>
  );
}
