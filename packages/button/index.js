import slugify from 'slugify'
import fragment from './fragment.graphql'
import classNames from 'classnames'
import useProductMeta from '@hashicorp/platform-product-meta'
import InlineSvg from '@hashicorp/react-inline-svg'
import svgArrowRight from './icons/arrow-right.svg?include'
import svgExternalLink from './icons/external-link.svg?include'
import svgCornerRightDown from './icons/corner-right-down.svg?include'
import svgDownload from './icons/download.svg?include'

const linkTypeToIcon = {
  inbound: svgArrowRight,
  outbound: svgExternalLink,
  anchor: svgCornerRightDown,
  download: svgDownload,
}

import normalizeButtonTheme from './helpers/normalizeButtonTheme.js'

function Button({
  title,
  url,
  label,
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
      aria-label={label}
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
