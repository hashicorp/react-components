import { ReactNode } from 'react'
import {
  Combobox as ReachCombobox,
  ComboboxInput as ReachComboboxInput,
  ComboboxPopover as ReachComboboxPopover,
  ComboboxList,
  ComboboxOption as ReachComboboxOption,
  ComboboxOptionText,
  ComboboxOptionProps,
  ComboboxProps,
  ComboboxPopoverProps,
  ComboboxInputProps,
} from '@reach/combobox'
import s from './style.module.css'

export function ComboboxBase({ onSelect, children, ...props }: ComboboxProps) {
  return (
    <div className={s.combobox}>
      <ReachCombobox onSelect={onSelect} {...props}>
        {children}
      </ReachCombobox>
    </div>
  )
}

export interface HashiComboboxPopoverProps extends ComboboxPopoverProps {
  children: ReactNode
}

export function ComboboxPopover({
  children,
  ...props
}: HashiComboboxPopoverProps) {
  return (
    <ReachComboboxPopover className={s.popover} {...props}>
      {children}
    </ReachComboboxPopover>
  )
}

export interface HashiComboboxInputProps extends ComboboxInputProps {
  className?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function ComboboxInput({
  className = '',
  ...props
}: HashiComboboxInputProps) {
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

export { ComboboxList, ComboboxOptionText }
