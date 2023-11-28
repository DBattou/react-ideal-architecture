import { SearchInput } from "./search-input";
import styles from "./styles.module.css";

type FiltersProps = {
  onQueryChange?: (query: string) => void;
  initialQuery?: string;
};

export function Filters({
  onQueryChange,
  initialQuery,
}: FiltersProps): JSX.Element {
  return (
    <div className={styles.filters}>
      <SearchInput
        className="mb-16"
        defaultValue={initialQuery}
        onChange={onQueryChange}
        placeholder="Search transactions..."
      />
    </div>
  );
}
