import styles from './nav-item.module.css'
import DropdownCarat from '../assets/icons/icon-dropdown'
import { useRef, useEffect } from 'react'
import BrowsePane from '../browse-pane'
import StackMenuSection from '../stack-menu-section'

export default function NavItem({ item, paneOpen, onPaneOpen, onPaneClose }) {
  return item.sections ? (
    <NavItemElement
      title={item.title}
      active={paneOpen}
      toggleBrowsePane={paneOpen === false ? onPaneOpen : onPaneClose}
    >
      <BrowsePane isOpen={paneOpen}>
        {item.sections.map((section) => (
          <StackMenuSection
            key={JSON.stringify(section)}
            groups={section.groups}
          />
        ))}
      </BrowsePane>
    </NavItemElement>
  ) : (
    <NavItemElement title={item.title} linkUrl={item.linkUrl} />
  )
}

function NavItemElement({
  active,
  toggleBrowsePane,
  children,
  linkUrl,
  title,
}) {
  return (
    <li
      className={`${styles.navItem} ${
        active ? ` ${styles.navItemActive}` : ''
      }`}
    >
      {toggleBrowsePane ? (
        <DropdownButton active={active} onClick={toggleBrowsePane}>
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
