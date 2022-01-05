import { useState, useRef, useEffect } from 'react'
import Button from '@hashicorp/react-button'
import styles from './style.module.css'

export default function Dropdown({
  options,
  onChange,
  title,
}: DropdownProps): React.ReactElement {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (buttonRef.current?.contains(event.target)) return

      setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={styles.root} ref={buttonRef}>
      <Button
        className="trigger"
        onClick={() => setOpen((open) => !open)}
        aria-expanded={open}
        aria-controls="menu-list"
        aria-haspopup="true"
        data-testid="version-dropdown"
        title={title}
        icon={{
          position: 'right',
          svg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7.5L10 12.5L15 7.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        }}
      />
      {open && (
        <ul className={styles.menu} id="menu-list" role="menu">
          {options.map((option) => (
            <li
              className={`${styles.option}`}
              tabIndex={0}
              role="menuitem"
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// Types

interface DropdownProps {
  options: { label: string; value: string }[]
  onChange: (string) => void
  title: string
}
