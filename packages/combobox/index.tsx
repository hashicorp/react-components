import s from './style.module.css'

import {
  Combobox as ReachCombobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from '@reach/combobox'

export default function Combobox({ onSelect, children }) {
  return (
    <div className={s.combobox}>
      <ReachCombobox onSelect={onSelect}>{children}</ReachCombobox>
    </div>
  )
}

// @TODO - Export styled child components
export {
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
}
