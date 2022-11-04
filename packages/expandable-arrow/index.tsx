import classNames from 'classnames'
import s from './style.module.css'

interface ExpandableArrowProps {
  className?: string
  expanded?: boolean
}

export default function ExpandableArrow({
  className,
  expanded = false,
}: ExpandableArrowProps) {
  return (
    <svg
      className={classNames(s.root, expanded && s.expanded, className)}
      width="9"
      height="10"
      viewBox="0 0 9 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable={false}
      data-testid="expandable-arrow"
    >
      <path d="M4 1L8 5L4 9" stroke="currentColor" strokeWidth={1.8} />
      <path
        className={s.line}
        d="M8 5H0"
        stroke="currentColor"
        strokeWidth={1.8}
      />
    </svg>
  )
}
