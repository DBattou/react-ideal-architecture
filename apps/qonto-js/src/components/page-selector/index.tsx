import type { MouseEventHandler } from "react";
import styles from "./styles.module.css";

const PER_PAGE_OPTIONS = [25, 50, 100];

type PageSelectorProps = {
  onPageChange: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
  page: number;
  perPage: number;
  totalCount: number;
};

export function PageSelector({
  onPageChange,
  onPerPageChange,
  page,
  perPage,
  totalCount,
}: PageSelectorProps): JSX.Element {
  const handlePerPageChange: MouseEventHandler<HTMLButtonElement> = (event) => {
    onPerPageChange?.(parseInt(event.currentTarget.value, 10));
  };

  const handlePreviousPage = (): void => {
    onPageChange(page - 1);
  };

  const handleNextPage = (): void => {
    onPageChange(page + 1);
  };

  return (
    <div className={styles.wrapper}>
      {onPerPageChange ? (
        <div className={styles.perPageContainer}>
          <div className={styles.options}>
            {PER_PAGE_OPTIONS.map((option) => (
              <button
                aria-label={`Display ${option} items per page`}
                aria-pressed={perPage === option}
                className={styles.option}
                key={option}
                onClick={handlePerPageChange}
                type="button"
                value={option}
              >
                {option}
              </button>
            ))}
          </div>
          <div>Items per page</div>
        </div>
      ) : null}

      <div className={styles.pageContainer}>
        <div>
          {(page - 1) * perPage + 1}-{Math.min(page * perPage, totalCount)} of{" "}
          {totalCount}
        </div>
        <div className={styles.options}>
          <button
            aria-label="Previous page of items"
            className={styles.option}
            disabled={page === 1}
            onClick={handlePreviousPage}
            type="button"
          >
            👈
          </button>
          <button
            aria-label="Next page of items"
            className={styles.option}
            disabled={page * perPage >= totalCount}
            onClick={handleNextPage}
            type="button"
          >
            👉
          </button>
        </div>
      </div>
    </div>
  );
}
