import {
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
  ComboboxBase,
} from './partials'
import { useMemo, useState } from 'react'
import filterOptions from './utils/filter-options'

export default function Combobox({
  label,
  onSelect,
  options,
  openOnFocus = true,
  renderOption,
}) {
  const [term, setTerm] = useState('')
  const results = useOptionMatch({ term, options })
  return (
    <ComboboxBase openOnFocus={openOnFocus} onSelect={onSelect}>
      <ComboboxInput onChange={(e) => setTerm(e.target.value)} />
      {results?.length > 0 ? (
        <ComboboxPopover>
          <ComboboxList aria-labelledby={label}>
            {results.map((option) => renderOption(option))}
          </ComboboxList>
        </ComboboxPopover>
      ) : null}
    </ComboboxBase>
  )
}

function useOptionMatch({ term, options }) {
  const filteredOptions = useMemo(() => filterOptions(term, options), [term])
  return filteredOptions.length !== 0 ? filteredOptions : options // Return all options if the filtered list is still empty
}

export {
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
  ComboboxBase,
}
