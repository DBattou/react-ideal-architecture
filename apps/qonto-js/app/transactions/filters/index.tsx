"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { SearchInput } from "./search-input";
import styles from "./styles.module.css";

export function Filters() {
  const params = useSearchParams();

  const pathname = usePathname();
  const router = useRouter();

  const handleQueryChange = useDebouncedCallback((query) => {
    const search = new URLSearchParams({ query });
    router.replace(`${pathname}?${search}`);
  }, 100);

  return (
    <div className={styles.filters}>
      <SearchInput
        placeholder="Search transactions..."
        defaultValue={params.get("query") ?? ""}
        onChange={handleQueryChange}
        className="mb-16"
      />
    </div>
  );
}
