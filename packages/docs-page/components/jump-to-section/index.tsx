import Link from 'next/link'
import cn from 'classnames'
import { useState } from 'react'

import styles from './jump-to-section.module.css'

interface Heading {
  aliases: string[]
  level: number
  permalinkSlug: string
  slug: string
  title: string
}

const JumpToSection = ({ headings = [] }: { headings: Heading[] }) => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => setOpen((s) => !s)
  const handleClose = () => setOpen(false)

  if (headings.length === 0) return null

  return (
    <div className={styles['jump-to-section']}>
      <span className={cn('g-type-label', styles.trigger)} onClick={toggleOpen}>
        Jump to Section
        <svg width="9" height="5" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.811 1.067a.612.612 0 0 0 0-.884.655.655 0 0 0-.908 0L4.5 3.491 1.097.183a.655.655 0 0 0-.909 0 .615.615 0 0 0 0 .884l3.857 3.75a.655.655 0 0 0 .91 0l3.856-3.75z"
            fillRule="evenodd"
          ></path>
        </svg>
      </span>
      <ul className={cn(styles.dropdown, { [styles.active]: open })}>
        {headings.map((heading: Heading) => {
          return (
            <li key={heading.permalinkSlug}>
              <Link href={`#${heading.permalinkSlug}`}>
                <a onClick={handleClose}>{heading.title}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default JumpToSection
