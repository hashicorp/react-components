import slugify from 'slugify'
import fragment from './fragment.graphql'
import classNames from 'classnames'
import useProductMeta from '@hashicorp/nextjs-scripts/lib/providers/product-meta'
import InlineSvg from '@hashicorp/react-inline-svg'
import svgArrowRight from './icons/arrow-right.svg.js'
import svgExternalLink from './icons/external-link.svg.js'
import svgChevronDown from './icons/chevron-down.svg.js'
import svgDownload from './icons/download.svg.js'

const linkTypeToIcon = {
  inbound: svgArrowRight,
  outbound: svgExternalLink,
  anchor: svgChevronDown,
  download: svgDownload,
}

import normalizeButtonTheme from './helpers/normalizeButtonTheme.js'

function Button({
  title,
  url,
  external,
  theme,
  ga_prefix,
  onClick,
  disabled,
  className,
  linkType,
  icon,
  size,
  ...attrs
}) {
  const themeObj = normalizeButtonTheme(theme)
  const { themeClass } = useProductMeta(themeObj.brand)
  const gaSlug = slugify(title, { lower: true })
  const isExternal = url && (linkType === 'outbound' || external)
  const Elem = url ? 'a' : 'button'
  const parsedIcon = linkTypeToIcon[linkType]
    ? {
        svg: linkTypeToIcon[linkType],
        position: icon ? icon.position : 'right',
        animationId: linkType,
        isAnimated: icon ? icon.isAnimated : true,
      }
    : icon
  const hasIcon = parsedIcon && parsedIcon.svg
  const hasRightIcon = hasIcon && parsedIcon.position !== 'left'
  const hasLeftIcon = hasIcon && parsedIcon.position === 'left'
  return (
    <Elem
      className={classNames(
        'g-btn',
        `size-${size}`,
        `variant-${themeObj.variant}`,
        themeClass,
        { 'brand-neutral': themeObj.brand === 'neutral' },
        `background-${themeObj.background}`,
        className
      )}
      data-ga-button={`${ga_prefix ? ga_prefix + ' | ' : ''}${gaSlug}`}
      href={url}
      rel={isExternal ? 'noopener' : undefined}
      target={isExternal ? '_blank' : undefined}
      onClick={onClick}
      disabled={disabled}
      {...attrs}
    >
      {hasLeftIcon && <ButtonIcon icon={parsedIcon} />}
      <span className="text g-type-buttons-and-standalone-links">{title}</span>
      {hasRightIcon && <ButtonIcon icon={parsedIcon} />}
    </Elem>
  )
}

function ButtonIcon(props) {
  const { svg, position, animationId, isAnimated } = props.icon
  const SvgComponent = () => <InlineSvg src={svg} />
  return (
    <span
      className={classNames('icon', `at-${position}`, {
        'is-animated': isAnimated,
      })}
      data-animation={animationId}
    >
      <SvgComponent />
    </span>
  )
}

Button.defaultProps = {
  className: '',
  theme: { variant: 'primary', brand: 'hashicorp', background: 'light' },
  size: 'medium',
}

Button.fragmentSpec = { fragment }

export default Button
