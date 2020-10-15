import './helpers/globalThis'

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

  // TODO, Brand Refactor
  // this needs to be removed after we refactor
  // our brands to properly be waypoint & boundary.
  //
  // This nav component leaks a little bit, as we have an automagical
  // treatment of the text for the brands, so there needs to be a little
  // translation so we can keep all of our other components just 'red'
  // and 'blue' for their branding.
  //
  // When this is refactored, all uses of styleBrand should be eliminated,
  // and we should go back to just directly passing the `brand` variable around.
  var styleBrand;
  if(brand === 'boundary') {
    styleBrand = 'red';
  } else if(brand === 'waypoint') {
    styleBrand = 'blue';
  } else {
    styleBrand = brand;
  }

  return (
    <div
      className={`constrain-width-wrapper ${
        constrainWidth ? 'g-grid-container' : ''
      }`}
    >
      <div
        className={`g-subnav-inner  brand-${styleBrand}  ${
          constrainWidth ? 'is-constrained' : ''
        }`}
        data-overflow-target
      >
        <TitleLink
          text={titleLink.text}
          url={titleLink.url}
          brand={styleBrand}
          Link={Link}
        />
        {!hasOverflow && (
          <MenuItemsDefault
            menuItems={menuItemsWithActive}
            menuItemsAlign={menuItemsAlign}
            brand={styleBrand}
            Link={Link}
          />
        )}
        {!hasOverflow && (
          <CtaLinks
            links={ctaLinks}
            brand={styleBrand}
            Link={Link}
            hideGithubStars={hideGithubStars}
          />
        )}
        {hasOverflow && (
          <MenuItemsOverflow
            menuItems={menuItemsWithActive}
            ctaLinks={ctaLinks}
            hideGithubStars={hideGithubStars}
            brand={styleBrand}
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
