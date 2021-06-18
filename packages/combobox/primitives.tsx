import { ReactNode } from 'react'
import {
  Combobox as ReachCombobox,
  ComboboxButton as ReachComboboxButton,
  ComboboxInput as ReachComboboxInput,
  ComboboxPopover as ReachComboboxPopover,
  ComboboxList,
  ComboboxOption as ReachComboboxOption,
  ComboboxOptionText,
  ComboboxProps,
  ComboboxPopoverProps as ReachComboboxPopoverProps,
  ComboboxInputProps as ReachComboboxInputProps,
  ComboboxOptionProps as ReachComboboxOptionProps,
  ComboboxButtonProps as ReachComboboxButtonProps,
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

export interface ComboboxPopoverProps extends ReachComboboxPopoverProps {
  children: ReactNode
  className?: string
}

export function ComboboxPopover({
  className = '',
  children,
  ...props
}: ComboboxPopoverProps) {
  return (
    <ReachComboboxPopover
      className={classnames(s.popover, className)}
      {...props}
    >
      {children}
    </ReachComboboxPopover>
  )
}

export interface ComboboxInputProps extends ReachComboboxInputProps {
  className?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function ComboboxInput({
  className = '',
  ...props
}: ComboboxInputProps) {
  return (
    <ReachComboboxInput className={classnames(s.input, className)} {...props} />
  )
}

export interface ComboboxOptionProps extends ReachComboboxOptionProps {
  className?: string
}

export function ComboboxOption({
  className = '',
  ...props
}: ComboboxOptionProps) {
  const mergedClassName = className ? `${s.option} ${className}` : s.option
  return <ReachComboboxOption className={mergedClassName} {...props} />
}

export interface ComboboxButtonProps extends ReachComboboxButtonProps {
  label?: string
  className?: string
  type?: string
}

export function ComboboxButton({
  label,
  className = '',
  type = 'button',
  ...props
}: ComboboxButtonProps) {
  const { isExpanded } = useComboboxContext()

  return (
    <ReachComboboxButton className={classnames(s.button, className)} {...props}>
      <VisuallyHidden>{label || 'Show all options'}</VisuallyHidden>
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
