import useNavRef from './helpers/useNavRef'

import MenuItemsOverflow from './partials/MenuItemsOverflow/index.js'
import TitleLink from './partials/TitleLink/index.js'
import MenuItemsDefault from './partials/MenuItemsDefault/index.js'
import CtaLinks from './partials/CtaLinks/index.js'
import traverse, { isObject } from './helpers/traverse/index.js'

const brandWhitelist = {
  consul: 'consul',
  hcp: 'hcp',
  nomad: 'nomad',
  packer: 'packer',
  terraform: 'terraform',
  tfc: 'terraform',
  vagrant: 'vagrant',
  vault: 'vault',
  boundary: 'boundary',
  waypoint: 'waypoint',
}

function SubnavInner(props) {
  const {
    hasOverflow,
    titleLink,
    ctaLinks,
    hideGithubStars,
    menuItems,
    menuItemsAlign,
    constrainWidth,
    currentPath,
    Link,
  } = props
  // Set the brand theme automatically based on the nav's title
  const brand = brandWhitelist[titleLink.text.toLowerCase()] || 'hashicorp'
  // Add _isActiveUrl to menuItems so we can highlight them appropriately
  const menuItemsWithActive = traverse(menuItems, (_key, value) => {
    const hasUrl = isObject(value) && value.url
    if (hasUrl) value._isActiveUrl = value.url === currentPath
    return value
  })

  return (
    <div
      className={`constrain-width-wrapper ${
        constrainWidth ? 'g-grid-container' : ''
      }`}
    >
      <div
        className={`g-subnav-inner  brand-${brand}  ${
          constrainWidth ? 'is-constrained' : ''
        }`}
        data-overflow-target
      >
        <TitleLink
          text={titleLink.text}
          url={titleLink.url}
          brand={brand}
          Link={Link}
        />
        {!hasOverflow && (
          <MenuItemsDefault
            menuItems={menuItemsWithActive}
            menuItemsAlign={menuItemsAlign}
            brand={brand}
            Link={Link}
          />
        )}
        {!hasOverflow && (
          <CtaLinks
            links={ctaLinks}
            brand={brand}
            Link={Link}
            hideGithubStars={hideGithubStars}
          />
        )}
        {hasOverflow && (
          <MenuItemsOverflow
            menuItems={menuItemsWithActive}
            ctaLinks={ctaLinks}
            hideGithubStars={hideGithubStars}
            brand={brand}
            Link={Link}
          />
        )}
      </div>
    </div>
  )
}

function Subnav(props) {
  const [isSticky, hasOverflow, wrapperRef] = useNavRef()

  return (
    <nav ref={wrapperRef} className={`g-subnav ${isSticky ? 'is-sticky' : ''}`}>
      <SubnavInner {...props} hasOverflow={hasOverflow} isSticky={isSticky} />
    </nav>
  )
}

Subnav.defaultProps = {
  menuItemsAlign: 'center',
  ctaLinks: [],
}

export default Subnav
