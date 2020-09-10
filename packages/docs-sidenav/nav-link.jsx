import React from 'react'
import PropTypes from 'prop-types'
import LinkWrap from '@hashicorp/react-link-wrap'

export default function NavLink({ title, href, active, Link }) {
  return (
    <li
      className={`${active ? 'active' : ''} ${
        href && href.match(/^http[s]*:\/\//) ? 'external' : ''
      }`}
      data-testid={href}
    >
      <LinkWrap
        Link={Link}
        href={href}
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </li>
  )
}

NavLink.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  active: PropTypes.bool,
  Link: PropTypes.func,
}
