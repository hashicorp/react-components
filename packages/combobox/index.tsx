import { useCallback, useMemo, useState, ReactNode } from 'react'
import {
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
  ComboboxBase,
  ComboboxButton,
} from './primitives'
import { ComboboxOption as ReachComboboxOption } from '@reach/combobox'
import filterOptions from './utils/filter-options'

export interface ComboboxProps {
  label: string
  buttonLabel?: string
  onSelect: (value) => void
  renderOption?: (option: ComboboxOptionValue) => ReactNode
  options: ComboboxOptionValue[]
  openOnFocus?: boolean
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  invalidInputValue?: boolean
}

type ComboboxOptionValue = string

export default function Combobox({
  label,
  buttonLabel = 'Show all options',
  onSelect,
  options,
  openOnFocus = true,
  onInputChange,
  renderOption,
  invalidInputValue,
}: ComboboxProps) {
  const [term, setTerm] = useState('')
  const results = useOptionMatch({ term, options })
  const handleInputValueChange = useCallback(
    (e) => {
      setTerm(e.currentTarget.value)
      if (onInputChange) return onInputChange(e)
    },
    [onInputChange]
  )

  return (
    <ComboboxBase
      openOnFocus={openOnFocus}
      onSelect={onSelect}
      aria-label={label}
    >
      <ComboboxButton label={buttonLabel} />
      <ComboboxInput
        onChange={handleInputValueChange}
        data-has-error={invalidInputValue ?? false}
      />
      {results?.length > 0 ? (
        <ComboboxPopover>
          <ComboboxList>
            {results.map((option) =>
              !!renderOption ? (
                <ReachComboboxOption key={option} value={option}>
                  {renderOption(option)}
                </ReachComboboxOption>
              ) : (
                <ComboboxOption key={option} value={option} />
              )
            )}
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
