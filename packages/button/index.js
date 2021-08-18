import slugify from 'slugify'
import fragment from './fragment.graphql'
import classNames from 'classnames'
import useProductMeta from '@hashicorp/platform-product-meta'
import InlineSvg from '@hashicorp/react-inline-svg'
import svgArrowRight from './icons/arrow-right.svg?include'
import svgExternalLink from './icons/external-link.svg?include'
import svgCornerRightDown from './icons/corner-right-down.svg?include'
import svgDownload from './icons/download.svg?include'
import s from './style.module.css'
import sTheme from './theme.module.css'
import useHover from './hooks/use-hover'

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
  const [hoverRef, isHovered] = useHover()
  const themeObj = normalizeButtonTheme(theme)
  const { themeClass } = useProductMeta(themeObj.brand)
  const gaSlug = slugify(title, { lower: true })
  const isExternal = url && (linkType === 'outbound' || external)
  const Elem = url ? 'a' : 'button'
  const iconProps = linkTypeToIcon[linkType]
    ? {
        svg: linkTypeToIcon[linkType],
        position: icon ? icon.position : 'right',
        animationId: linkType,
        isAnimated: icon ? icon.isAnimated : true,
        isHovered,
        size,
      }
    : { ...icon, size, isHovered }
  const hasIcon = iconProps && iconProps.svg
  const hasRightIcon = hasIcon && iconProps.position !== 'left'
  const hasLeftIcon = hasIcon && iconProps.position === 'left'

  return (
    <Elem
      className={classNames(
        s.root,
        themeClass,
        s[`size-${size}`],
        sTheme[`variant-${themeObj.variant}`],
        { [sTheme['brand-neutral']]: themeObj.brand === 'neutral' },
        sTheme[`background-${themeObj.background}`],
        className
      )}
      data-ga-button={`${ga_prefix ? ga_prefix + ' | ' : ''}${gaSlug}`}
      href={url}
      ref={hoverRef}
      rel={isExternal ? 'noopener' : undefined}
      target={isExternal ? '_blank' : undefined}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      {...attrs}
    >
      {hasLeftIcon && <ButtonIcon {...iconProps} />}
      <span className={s.text}>{title}</span>
      {hasRightIcon && <ButtonIcon {...iconProps} />}
    </Elem>
  )
}

function ButtonIcon({
  svg,
  position,
  animationId,
  isAnimated,
  isHovered,
  size,
}) {
  return (
    <InlineSvg
      className={classNames(
        s.icon,
        s[`size-${size}`],
        s[`at-${position}`],
        { [s.isHovered]: isHovered },
        { [s[`animation-${animationId}`]]: isAnimated }
      )}
      src={svg}
    />
  )
}

Button.defaultProps = {
  className: '',
  theme: { variant: 'primary', brand: 'hashicorp', background: 'light' },
  size: 'medium',
}

Button.fragmentSpec = { fragment }

export default Button
