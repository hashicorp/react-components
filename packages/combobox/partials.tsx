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
  ComboboxButton as ReachComboboxButton,
  useComboboxContext,
} from '@reach/combobox'
import { VisuallyHidden } from '@reach/visually-hidden'
import classnames from 'classnames'

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
  className?: string
}

export function ComboboxPopover({
  className = '',
  children,
  ...props
}: HashiComboboxPopoverProps) {
  return (
    <ReachComboboxPopover
      className={classnames(s.popover, className)}
      {...props}
    >
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
  return (
    <ReachComboboxInput className={classnames(s.input, className)} {...props} />
  )
}

export interface HashiComboboxOptionProps extends ComboboxOptionProps {
  className?: string
}

export function ComboboxOption({
  className = '',
  ...props
}: HashiComboboxOptionProps) {
  const mergedClassName = className ? `${s.option} ${className}` : s.option
  return <ReachComboboxOption className={mergedClassName} {...props} />
}

export function ComboboxButton({ label, className = '', ...props }) {
  const { isExpanded } = useComboboxContext()

  return (
    <ReachComboboxButton className={classnames(s.button, className)} {...props}>
      <VisuallyHidden>{label}</VisuallyHidden>
      <img
        className={classnames(s.dropdownCaretIcon, {
          [s.dropdownCaretIconActive]: isExpanded,
        })}
        alt="" // https://www.w3.org/WAI/tutorials/images/decorative/
        src={require('./assets/icon-dropdown-gray.svg')}
      />
    </ReachComboboxButton>
  )
}

export { ComboboxList, ComboboxOptionText }
