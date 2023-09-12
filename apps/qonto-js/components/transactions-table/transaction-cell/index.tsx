import type { Transaction } from "@/services/transactions";
import styles from "./styles.module.css";

type TransactionCellProps = Pick<
  Transaction,
  "status" | "counterpartyName" | "activityTag"
>;

export function TransactionCell({
  status,
  activityTag,
  counterpartyName,
}: TransactionCellProps) {
  return (
    <>
      <img
        src={`/icons/${activityTag}.svg`}
        role="presentation"
        alt=""
        className="mr-16"
        width={32}
        height={32}
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
