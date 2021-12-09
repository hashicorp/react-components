import React from 'react'
import LinkWrap from '@hashicorp/react-link-wrap'
import CtaLinks from '../CtaLinks/index.js'
import DropdownTrigger from '../DropdownTrigger/index.js'
import s from './style.module.css'
import classNames from 'classnames'
class MenuItemsOverflow extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isCollapsed: true }
    this.toggleCollapsed = this.toggleCollapsed.bind(this)
    this.parentRef = React.createRef()
    this.handleClick = this.handleClick.bind(this)
  }

  toggleCollapsed() {
    this.setState({ isCollapsed: !this.state.isCollapsed })
  }

  handleClick(event) {
    //  If already collapsed, clicks outside the modal don't matter
    if (this.state.isCollapsed) return true
    //  If we're not collapsed, and the click is outside the component,
    //  we should ensure that the modal closes
    const isClickOutside = !this.parentRef.current.contains(event.target)
    //  If we're not collapsed, and the click is on an anchor element with an
    //  href attribute, we're likely performing a navigation, and should ensure
    //  that the modal closes
    const isClickNavigation = event.target.tagName === 'A' && event.target.href
    if (isClickOutside || isClickNavigation) {
      this.setState({ isCollapsed: true })
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick)
  }

  render() {
    const {
      menuItems,
      ctaLinks,
      product,
      Link,
      hideGithubStars,
      theme,
    } = this.props
    const { isCollapsed } = this.state
    return (
      <div className={s.root} ref={this.parentRef}>
        <DropdownTrigger
          isCollapsed={isCollapsed}
          onClick={this.toggleCollapsed}
          text="Menu"
          product={product}
        />
        <div
          className={classNames(s.dropdown, { [s.isCollapsed]: isCollapsed })}
        >
          <ul className={s.ulElem}>
            {menuItems.map((menuItem, stableIdx) => {
              if (menuItem === 'divider') return null
              const { text, url, submenu } = menuItem
              if (submenu) {
                //  If we have a submenu, we need to flatten it
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={stableIdx}>
                    <div className={s.submenuTitle}>{text}</div>
                    <hr className={s.divider} />
                    {submenu.map((subItem, subStableIdx) => (
                      <SubmenuItem
                        // eslint-disable-next-line react/no-array-index-key
                        key={subStableIdx}
                        url={subItem.url}
                        text={subItem.text}
                        product={product}
                        Link={Link}
                      />
                    ))}
                    <hr className={s.divider} />
                  </div>
                )
              } else {
                return (
                  <SubmenuItem
                    // eslint-disable-next-line react/no-array-index-key
                    key={stableIdx}
                    url={url}
                    text={text}
                    product={product}
                    Link={Link}
                  />
                )
              }
            })}
          </ul>
          <CtaLinks
            links={ctaLinks}
            isInDropdown={true}
            product={product}
            hideGithubStars={hideGithubStars}
            theme={theme}
          />
        </div>
      </div>
    )
  }
}

function SubmenuItem({ url, text, Link }) {
  return (
    <li>
      <LinkWrap Link={Link} className={s.submenuItem} href={url} title={text}>
        {text}
      </LinkWrap>
    </li>
  )
}

export default MenuItemsOverflow
