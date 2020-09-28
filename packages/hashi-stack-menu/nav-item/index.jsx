import styles from './nav-item.module.css'
import slugify from 'slugify'
import DropdownCarat from '../assets/icons/icon-dropdown'
import { useRef, useEffect } from 'react'

export default function NavItem({
  active,
  handleActivate,
  children,
  linkUrl,
  title,
}) {
  const slug = slugify(title, { lower: true })

  return (
    <li
      className={`${styles.navItem} ${slug}${
        active ? ` ${styles.navItemActive}` : ''
      }`}
    >
      {handleActivate ? (
        <DropdownButton active={active} onClick={() => handleActivate(slug)}>
          {title}
        </DropdownButton>
      ) : (
        <AnchorLink url={linkUrl}>{title}</AnchorLink>
      )}
      {children}
    </li>
  )
}

function DropdownButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      className={`${styles.buttonReset}  g-type-buttons-and-standalone-links ${
        styles.link
      } ${active ? ` ${styles.linkActive}` : ''}`}
      onClick={onClick}
    >
      {children}
      <DropdownCarat />
    </button>
  )
}

function AnchorLink({ url, children }) {
  const linkRef = useRef()
  useEffect(() => {
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.trackLink(
        linkRef.current,
        'Clicked HashiStackMenu Link',
        { url }
      )
    }
  }, [linkRef])
  return (
    <a
      ref={linkRef}
      className={`g-type-buttons-and-standalone-links ${styles.link}`}
      href={url}
    >
      {children}
    </a>
  )
}
