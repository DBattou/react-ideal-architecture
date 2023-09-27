import { useRouter } from "next/router";
import { useDebouncedCallback } from "use-debounce";
import { SearchInput } from "./search-input";
import styles from "./styles.module.css";

export function Filters() {
  const router = useRouter();

  const handleQueryChange = useDebouncedCallback((query) => {
    if (query) {
      router.query.query = query;
    } else {
      delete router.query.query;
    }
    delete router.query.page;

    router.replace(router);
  }, 100);

  return (
    <div className={styles.filters}>
      <SearchInput
        placeholder="Search transactions..."
        defaultValue={(router.query.query as string) ?? ""}
        onChange={handleQueryChange}
        className="mb-16"
      />
    </div>
  );
}
