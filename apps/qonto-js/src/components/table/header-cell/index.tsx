import type { AriaAttributes, ComponentPropsWithoutRef } from "react";
import cx from "classnames";
import styles from "./styles.module.css";

type BaseHeaderCellProps = ComponentPropsWithoutRef<"th">;

type SortableHeaderCellProps = {
  isSortable: true;
  onSort?: (event: unknown) => void;
  isSorted: "asc" | "desc" | false;
};

type UnsortableHeaderCellProps = {
  isSortable: false;
};

type HeaderCellProps = BaseHeaderCellProps &
  (SortableHeaderCellProps | UnsortableHeaderCellProps);

function getAriaSort(sort): AriaAttributes["aria-sort"] {
  if (sort === "asc") return "ascending";
  if (sort === "desc") return "descending";
  return "none";
}

export function HeaderCell({
  className,
  children,
  ...props
}: HeaderCellProps): JSX.Element {
  if (props.isSortable) {
    const { onSort, isSorted, isSortable: _, ...rest } = props;
    return (
      <th
        aria-sort={getAriaSort(isSorted)}
        className={cx(styles.headerCell, className)}
        scope="col"
        {...rest}
      >
        <button
          aria-pressed={Boolean(isSorted)}
          className={styles.headerContent}
          onClick={onSort}
          type="button"
        >
          {children}
          {isSorted
            ? {
                asc: " 🔼",
                desc: " 🔽",
              }[isSorted]
            : null}
        </button>
      </th>
    );
  }
  return (
    <th className={cx(styles.headerCell, className)} scope="col">
      <div className={styles.headerContent}>{children}</div>
    </th>
  );
}
