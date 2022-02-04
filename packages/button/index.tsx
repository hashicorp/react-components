import React from 'react'
import slugify from 'slugify'
import Link from 'next/link'
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
import normalizeButtonTheme from './helpers/normalizeButtonTheme.js'
import { Size, LinkType, IconObject, Theme, IconProps } from './types'

const linkTypeToIcon = {
  inbound: svgArrowRight,
  outbound: svgExternalLink,
  anchor: svgCornerRightDown,
  download: svgDownload,
}

interface ButtonProps {
  title: string
  url?: string
  label?: string
  external?: boolean
  theme?: Theme
  ga_prefix?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement> &
    React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  className?: string
  linkType?: LinkType
  icon?: IconObject
  size?: Size
  /**
   * Note: Removing this TS "any" seems like it'll be quite a task.
   * One path forward might be to fully separate our
   * "ButtonButton" and "AnchorButton", and ask the consumer
   * to choose the correct component based on whether they need
   * a <a> or <button>.
   * Task ref: https://app.asana.com/0/1100423001970639/1200880473915564/f
   */
  [attr: string]: $TSFixMe
}

function Button({
  title,
  url,
  label,
  external,
  theme = {
    variant: 'primary',
    brand: 'hashicorp',
    background: 'light',
  },
  ga_prefix,
  onClick,
  disabled,
  className,
  linkType,
  icon,
  size = 'medium',
  ...attrs
}: ButtonProps): React.ReactElement {
  const [hoverRef, isHovered] = useHover<
    HTMLAnchorElement & HTMLButtonElement
  >()
  const themeObj = normalizeButtonTheme(theme)
  const { themeClass } = useProductMeta(themeObj.brand)
  const gaSlug = slugify(title, { lower: true })
  const isExternal = url && (linkType === 'outbound' || external)
  const Elem = url ? 'a' : 'button'
  const iconProps =
    linkType && linkTypeToIcon[linkType]
      ? ({
          svg: linkTypeToIcon[linkType],
          position: icon?.position || 'right',
          animationId: linkType,
          isAnimated: icon?.isAnimated || true,
          isHovered,
          size,
        } as IconProps)
      : { ...icon, position: icon?.position || 'right', size, isHovered }
  const hasIcon = iconProps && iconProps.svg
  const hasRightIcon = hasIcon && iconProps.position !== 'left'
  const hasLeftIcon = hasIcon && iconProps.position === 'left'

  const content = (
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
      ref={hoverRef}
      rel={isExternal ? 'noopener' : undefined}
      target={isExternal ? '_blank' : undefined}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      {...attrs}
    >
      {hasLeftIcon && <Icon {...iconProps} svg={iconProps.svg!} />}
      <span className={s.text}>{title}</span>
      {hasRightIcon && <Icon {...iconProps} svg={iconProps.svg!} />}
    </Elem>
  )

  return url ? <Link href={url}>{content}</Link> : content
}

function Icon({
  svg,
  position,
  animationId,
  isAnimated,
  isHovered,
  size,
}: IconProps) {
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

Button.fragmentSpec = { fragment }

export default Button
