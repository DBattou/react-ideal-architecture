import styles from "./styles.module.css";

type PageProps = {
  params: { id: string };
};

export default function TransactionsShow({ params }: PageProps): JSX.Element {
  return (
    <section className={styles.panel}>
      Details for transaction {params.id}
    </section>
  );
}
