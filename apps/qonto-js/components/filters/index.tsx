import { useRouter } from "next/router";
import { useDebouncedCallback } from "use-debounce";
import { SearchInput } from "./search-input";
import styles from "./styles.module.css";

export function Filters(): JSX.Element {
  const router = useRouter();

  const handleQueryChange = useDebouncedCallback((query: string) => {
    if (query) {
      router.query.query = query;
    } else {
      delete router.query.query;
    }
    delete router.query.page;

    void router.replace({ query: router.query });
  }, 100);

  return (
    <div className={styles.filters}>
      <SearchInput
        className="mb-16"
        defaultValue={router.query.query as string}
        onChange={handleQueryChange}
        placeholder="Search transactions..."
      />
    </div>
  );
}
