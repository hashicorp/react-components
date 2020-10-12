// Downshift should be pinned to 3.1.5, aria-selected behavior changed after that version, and the new behaviour is not what we want at the moment
import Downshift from 'downshift'

/**
 * Select input field
 * @prop {String} name - input name attribute
 * @prop {String} label - text to display above the input
 * @prop {String} defaultLabel - text to act as placeholder label
 * @prop {String} value - set the value via prop
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
  onValueChange = () => {},
}) {
  const displayLabel = defaultLabel || 'Select an option'
  // Changes to the value prop will re-render this component by updating the key value.
  return (
    <Downshift
      key={value}
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
        isOpen,
        toggleMenu,
        selectedItem,
        inputValue,
        highlightedIndex,
      }) => {
        return (
          <div
            className={`g-select-input ${isOpen ? 'open' : ''}`}
            data-cy={name}
          >
            <label {...getLabelProps()} onClick={toggleMenu}>
              {label}
            </label>
            <input type="hidden" name={name} value={inputValue} />
            <button {...getInputProps()} onClick={toggleMenu} type="button">
              {selectedItem ? selectedItem.label : displayLabel}
            </button>
            <div>
              <ul {...getMenuProps()}>
                {options.map((opt, index) => {
                  return (
                    <li
                      key={opt.name}
                      data-name={opt.name}
                      data-label={opt.label}
                      className={highlightedIndex === index ? 'active' : ''}
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
