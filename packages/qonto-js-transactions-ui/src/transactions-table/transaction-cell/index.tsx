import type { Transaction } from "qonto-api";
import styles from "./styles.module.css";

type TransactionCellProps = Pick<
  Transaction,
  "status" | "counterpartyName" | "activityTag"
>;

export function TransactionCell({
  status,
  activityTag,
  counterpartyName,
}: TransactionCellProps): JSX.Element {
  return (
    <>
      <img
        alt=""
        className="mr-16"
        height={32}
        role="presentation"
        src={`/icons/${activityTag}.svg`}
        width={32}
      />
      <div className={styles.transactionBody}>
        <span className={styles.counterpartyName}>{counterpartyName}</span>
        {status !== "completed" && (
          <span className={styles.status}>{status}</span>
        )}
      </div>
    </>
  );
}
