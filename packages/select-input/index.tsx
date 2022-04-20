// Downshift should be pinned to 3.1.5, aria-selected behavior changed after that version, and the new behaviour is not what we want at the moment
import classNames from 'classnames'
import Downshift from 'downshift'
import s from './style.module.css'

interface SelectInputProps {
  name?: string
  label?: string
  defaultLabel?: string
  options: { name: string; label: string }[]
  value?: { name: string; label: string }
  onValueChange?: (name: string) => void
  size?: 'small' | 'medium'
}

/**
 * Select input field
 * @prop {String} name - input name attribute
 * @prop {String} label - text to display above the input
 * @prop {String} defaultLabel - text to act as placeholder label
 * @prop {Object} value - set the value via prop
 * @prop {String} value.name - item name
 * @prop {String} value.label - item label
 * @prop {Array} options - array of option objects within the select
 * @prop {String} options[].name - option name
 * @prop {String} options[].label - option label
 * @prop {Function} onValueChange - function called with the value when it
 * changes
 */
export default function SelectInput({
  name,
  label,
  defaultLabel,
  options,
  value,
  onValueChange = () => {
    /* do nothing */
  },
  size = 'medium',
}: SelectInputProps) {
  const displayLabel = defaultLabel || 'Select an option'
  // Changes to the value prop will re-render this component by updating the key value.
  return (
    <Downshift
      key={value?.name}
      initialSelectedItem={value}
      itemToString={(item) => item && item.name}
      onChange={(item) => {
        onValueChange(item.name)
      }}
    >
      {({
        getLabelProps,
        getInputProps,
        getMenuProps,
        getItemProps,
        toggleMenu,
        selectedItem,
        inputValue,
        highlightedIndex,
      }) => {
        return (
          <div
            className={classNames(s.select, 'g-select-input')}
            data-cy={name}
            data-size={size}
          >
            {label ? (
              <label {...getLabelProps()} onClick={toggleMenu}>
                {label}
              </label>
            ) : null}
            <input type="hidden" name={name} value={inputValue ?? undefined} />
            <button {...getInputProps()} onClick={toggleMenu} type="button">
              {selectedItem ? selectedItem.label : displayLabel}
              <span className={s.arrow} aria-hidden>
                <svg viewBox="0 0 14 8" xmlns="http://www.w3.org/2000/svg">
                  <title>Mask</title>
                  <defs>
                    <path
                      d="M413.293 1341.293l-5.293 5.293-5.293-5.293a.999.999 0 1 0-1.414 1.414l6 6a.997.997 0 0 0 1.414 0l6-6a.999.999 0 1 0-1.414-1.414"
                      id="a"
                    />
                  </defs>
                  <use
                    fill="#9A9EA5"
                    xlinkHref="#a"
                    transform="translate(-401 -1341)"
                    fillRule="evenodd"
                  />
                </svg>
              </span>
            </button>
            <div className={s.selectBox}>
              <ul {...getMenuProps()}>
                {options.map((opt, index) => {
                  return (
                    <li
                      key={opt.name}
                      data-name={opt.name}
                      data-label={opt.label}
                      data-active={highlightedIndex === index}
                      {...getItemProps({ item: opt })}
                    >
                      {opt.label}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )
      }}
    </Downshift>
  )
}
