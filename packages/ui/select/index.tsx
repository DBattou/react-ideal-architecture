import { useSelect } from "downshift";
import styles from "./styles.module.css";
import cx from "classnames";
/**
 * We don't have to enforce an Option type if we expose an
 * itemToString prop for example, but this makes things a bit easier for now
 * API is subject to change
 */
type Option = {
  id: string;
  label: string;
  value: any;
};

type SelectProps = {
  label?: string;
  options: Option[];
  placeholder?: string;
  initialSelectedItem?: Option /* for uncontrolled mode */;
  selectedItem?: Option /* for controlled mode */;
  onChange?: (changes: object) => void;
};

export function Select({
  options,
  label,
  placeholder,
  initialSelectedItem,
  selectedItem: selectedItemFromProps,
  onChange,
}: SelectProps) {
  const itemToString = (i: Option | null) => (i ? i.label : "");

  const {
    isOpen,
    getMenuProps,
    getLabelProps,
    getItemProps,
    getToggleButtonProps,
    selectedItem,
    highlightedIndex,
  } = useSelect({
    items: options,
    itemToString,
    initialSelectedItem,
    onSelectedItemChange: onChange,
    selectedItem: selectedItemFromProps,
  });

  return (
    <div>
      <div>
        {label && (
          <label {...getLabelProps({ className: styles.label })}>{label}</label>
        )}
        <div {...getToggleButtonProps({ className: styles.control })}>
          <span
            className={cx(styles.valueDisplay, {
              [styles.placeholder]: !selectedItem,
            })}
          >
            {selectedItem ? itemToString(selectedItem) : placeholder}
          </span>
          <span className={styles.chevron}>
            {isOpen ? <>&#8593;</> : <>&#8595;</>}
          </span>
        </div>
      </div>
      <div {...getMenuProps({ className: styles.menu })}>
        {isOpen && (
          <ul className={styles.list}>
            {options.map((item, index) => (
              <li
                key={item.id}
                {...getItemProps({
                  item,
                  index,
                  className: cx(styles.item, {
                    [styles.highlighted]: index === highlightedIndex,
                  }),
                })}
              >
                {itemToString(item)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
