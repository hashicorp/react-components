import s from './style.module.css'

import {
  Combobox as ReachCombobox,
  ComboboxInput as ReachComboboxInput,
  ComboboxPopover as ReachComboboxPopover,
  ComboboxList,
  ComboboxOption as ReachComboboxOption,
  ComboboxOptionText,
  ComboboxOptionProps,
} from '@reach/combobox'
import { useMemo, useState } from 'react'
import filterOptions from './utils/filter-options'

export default function Combobox({ onSelect, children }) {
  return (
    <div className={s.combobox}>
      <ReachCombobox onSelect={onSelect}>{children}</ReachCombobox>
    </div>
  )
}

export function ComboboxPopover({ children, ...props }) {
  return (
    <ReachComboboxPopover className={s.popover} {...props}>
      {children}
    </ReachComboboxPopover>
  )
}

export function ComboboxInput({ className = '', ...props }) {
  const mergedClassName = className ? `${s.option} ${className}` : s.input
  return <ReachComboboxInput className={mergedClassName} {...props} />
}

export interface HashiComboboxOptionProps extends ComboboxOptionProps {
  className: string
}

export function ComboboxOption({
  className = '',
  ...props
}: HashiComboboxOptionProps) {
  const mergedClassName = className ? `${s.option} ${className}` : s.option
  return <ReachComboboxOption className={mergedClassName} {...props} />
}

// @TODO - Export styled child components
export { ComboboxList, ComboboxOptionText }

export function ComboboxTypeahead({ label, onSelect, options, renderOption }) {
  const [term, setTerm] = useState('')

  const results = useOptionMatch({ term, options })
  return (
    <Combobox onSelect={onSelect}>
      <ComboboxInput onChange={(e) => setTerm(e.target.value)} />
      {results?.length > 0 ? (
        <ComboboxPopover>
          <ComboboxList aria-labelledby={label}>
            {results.map((r) =>
              renderOption({ value: r.value, label: r.label })
            )}
          </ComboboxList>
        </ComboboxPopover>
      ) : null}
    </Combobox>
  )
}

function useOptionMatch({ term, options }) {
  const filteredOptions = useMemo(() => filterOptions(term, options), [term])
  return filteredOptions.length !== 0 ? filteredOptions : options // Return all options if the filtered list is still empty
}
