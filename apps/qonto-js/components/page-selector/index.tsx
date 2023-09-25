import { MouseEventHandler } from "react";
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
}: PageSelectorProps) {
  const handlePerPageChange: MouseEventHandler<HTMLButtonElement> = (event) => {
    onPerPageChange?.(parseInt(event.currentTarget.value, 10));
  };

  const handlePreviousPage = () => {
    onPageChange(page - 1);
  };

  const handleNextPage = () => {
    onPageChange(page + 1);
  };

  return (
    <div className={styles.wrapper}>
      {handlePerPageChange && (
        <div className={styles.perPageContainer}>
          <div className={styles.options}>
            {PER_PAGE_OPTIONS.map((option) => (
              <button
                key={option}
                value={option}
                className={styles.option}
                aria-pressed={perPage === option}
                onClick={handlePerPageChange}
                aria-label={`Display ${option} items per page`}
              >
                {option}
              </button>
            ))}
          </div>
          <div>Items per page</div>
        </div>
      )}

      <div className={styles.pageContainer}>
        <div>
          {(page - 1) * perPage + 1}-{Math.min(page * perPage, totalCount)} of{" "}
          {totalCount}
        </div>
        <div className={styles.options}>
          <button
            className={styles.option}
            onClick={handlePreviousPage}
            disabled={page === 1}
            aria-label="Previous page of items"
          >
            👈
          </button>
          <button
            className={styles.option}
            onClick={handleNextPage}
            disabled={page * perPage >= totalCount}
            aria-label="Next page of items"
          >
            👉
          </button>
        </div>
      </div>
    </div>
  );
}
