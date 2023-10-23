import { useAbilities } from "@/services/abilities/abilities-context";
import styles from "./styles.module.css";

export function BankAccount(): JSX.Element {
  const abilities = useAbilities("bank-account");
  const canCreate = abilities?.canCreate;

  return (
    <div className={styles.card}>
      <h2 className={styles.subtitle}>
        {canCreate ? "Create a new account" : null}
      </h2>
    </div>
  );
}
