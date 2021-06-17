import {
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
  ComboboxBase,
} from './partials'
import { useMemo, useState, ReactNode, Fragment } from 'react'
import filterOptions from './utils/filter-options'

interface ComboboxProps {
  label: string
  onSelect: (value) => void
  renderOption: (option: ComboboxOptionValue) => ReactNode
  options: ComboboxOptionValue[]
  openOnFocus?: boolean
}

type ComboboxOptionValue = string

export default function Combobox({
  label,
  onSelect,
  options,
  openOnFocus = true,
  renderOption,
}: ComboboxProps) {
  const [term, setTerm] = useState('')
  const results = useOptionMatch({ term, options })
  return (
    <ComboboxBase openOnFocus={openOnFocus} onSelect={onSelect}>
      <ComboboxInput onChange={(e) => setTerm(e.currentTarget.value)} />
      {results?.length > 0 ? (
        <ComboboxPopover>
          <ComboboxList aria-labelledby={label}>
            {results.map((option) => (
              <Fragment key={option}>{renderOption(option)}</Fragment> // Prevent key warning
            ))}
          </ComboboxList>
        </ComboboxPopover>
      ) : null}
    </ComboboxBase>
  )
}

export interface OptionMatchParam {
  term: string
  options: ComboboxOptionValue[]
}

export function useOptionMatch({ term, options }: OptionMatchParam) {
  const filteredOptions = useMemo(() => filterOptions({ term, options }), [
    term,
  ])
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
