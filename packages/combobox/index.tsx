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

export default function Combobox({ onSelect, children }) {
  return (
    <div className={s.combobox}>
      <ReachCombobox onSelect={onSelect}>{children}</ReachCombobox>
    </div>
  )
}

export function ComboboxPopover({ onSelect, children, ...props }) {
  return (
    <ReachComboboxPopover className={s.popover} {...props}>
      {children}
    </ReachComboboxPopover>
  )
}

export function ComboboxInput({ className, ...props }) {
  const mergedClassName = className ? `${s.option} ${className}` : s.input
  return <ReachComboboxInput className={mergedClassName} {...props} />
}

export interface HashiComboboxOptionProps extends ComboboxOptionProps {
  className: string
}

export function ComboboxOption({
  className,
  ...props
}: HashiComboboxOptionProps) {
  const mergedClassName = className ? `${s.option} ${className}` : s.option
  return <ReachComboboxOption className={mergedClassName} {...props} />
}

// @TODO - Export styled child components
export { ComboboxList, ComboboxOptionText }
