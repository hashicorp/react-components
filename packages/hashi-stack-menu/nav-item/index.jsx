import styles from './nav-item.module.css'
import DropdownCarat from '../assets/icons/icon-dropdown'
import { useRef, useEffect } from 'react'
import BrowsePanel from '../browse-panel'
import StackMenuSection from '../stack-menu-section'
import useOnClickOutsideDropdown from '../use-on-click-outside-dropdown'

export default function NavItem({
  item,
  panelOpen,
  onPanelOpen,
  onPanelClose,
}) {
  return item.sections ? (
    <NavItemElement
      title={item.title}
      active={panelOpen}
      toggleBrowsePanel={panelOpen === false ? onPanelOpen : onPanelClose}
    >
      <BrowsePanel isOpen={panelOpen} closeFn={onPanelClose}>
        {item.sections.map((section, idx) => (
          <StackMenuSection
            key={JSON.stringify({ type: section.type, index: idx })}
            visiblyNewSection={
              idx > 0 && item.sections[idx - 1].type !== section.type
            }
            groups={section.groups}
          />
        ))}
      </BrowsePanel>
    </NavItemElement>
  ) : (
    <NavItemElement title={item.title} linkUrl={item.linkUrl} />
  )
}

function NavItemElement({
  active,
  toggleBrowsePanel,
  children,
  linkUrl,
  title,
}) {
  // The <li> is the parent of <BrowsePanel /> which will slot into here as {children}
  // Becuase the <li> is a parent it makes it ideal to handle the outside click hook which relies on a ref + the DOM element heirarchy
  const parentItemRef = useRef(null)

  useOnClickOutsideDropdown(parentItemRef, active, toggleBrowsePanel)
  return (
    <li ref={parentItemRef} className={styles.navItem}>
      {toggleBrowsePanel ? (
        <DropdownButton active={active} onClick={toggleBrowsePanel}>
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
      className={`${styles.buttonReset} g-type-buttons-and-standalone-links ${
        styles.link
      } ${active ? ` ${styles.buttonActive}` : ''}`}
      onClick={onClick}
    >
      {children}
      <span className={styles.visuallyHidden}>
        {active ? 'Close this menu' : 'Open this menu'}
      </span>
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
