import React from 'react'
import PropTypes from 'prop-types'
import ChevronIcon from './chevron-icon'

export default function NavContainer({ title, expanded, active, children }) {
  return (
    <li
      className={`dir ${expanded ? 'open' : ''} ${active ? 'active' : ''}`}
      data-testid={`${title} container`}
    >
      <span>
        {/* Note: this is rendered as a link, but with no href. We should test to see if */}
        {/* a button element would be more semantically appropriate for a11y. */}
        <a onClick={toggleNav}>
          <ChevronIcon />{' '}
          {
            <span
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            ></span>
          }
        </a>
      </span>
      <ul className="nav">{children}</ul>
    </li>
  )
}

NavContainer.propTypes = {
  title: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  active: PropTypes.bool,
  children: PropTypes.any.isRequired,
}

// Opens and closes a given nav category, the easy way
function toggleNav(e) {
  e.preventDefault()
  e.currentTarget.parentElement.parentElement.classList.toggle('open')
}
