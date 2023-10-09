import styles from "./styles.module.css";

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps): JSX.Element {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
