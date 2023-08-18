import { AriaAttributes, ComponentPropsWithoutRef } from "react";
import styles from "./header-cell.module.css";
import cx from "classnames";

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

export function HeaderCell({ className, children, ...props }: HeaderCellProps) {
  if (props.isSortable === true) {
    const { onSort, isSorted, isSortable, ...rest } = props;
    return (
      <th
        className={cx(styles.headerCell, className)}
        aria-sort={getAriaSort(isSorted)}
        {...rest}
      >
        <button
          className={styles.headerContent}
          onClick={onSort}
          aria-pressed={!!isSorted}
        >
          {children}
          {isSorted &&
            {
              asc: " 🔼",
              desc: " 🔽",
            }[isSorted]}
        </button>
      </th>
    );
  } else {
    return (
      <th className={cx(styles.headerCell, className)}>
        <div className={styles.headerContent}>{children}</div>
      </th>
    );
  }
}
