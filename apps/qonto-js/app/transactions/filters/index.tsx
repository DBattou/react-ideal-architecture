"use client";

import { SearchInput } from "./search-input";
import styles from "./styles.module.css";

export function Filters() {
  return (
    <div className={styles.filters}>
      <SearchInput placeholder="Search transactions..." />
    </div>
  );
}
