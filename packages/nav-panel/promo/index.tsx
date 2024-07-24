import React, { useCallback } from 'react'
import s from './style.module.css'
import Link from 'next/link'
import classNames from 'classnames'
import FlightIcon from '@hashicorp/react-design-system-components/src/components/flight-icon'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'

export interface PromoProps {
  title: string
  description: string
  linkUrl: string
  linkTitle: string
  slug?: string
  icon?: string
  theme: string
  parseUrl?: (url: string) => {
    linkType: 'inbound' | 'outbound'
    href: string
  }
  trackNavClickEvent?: (name: string, href: string, section?: string) => void
  v?: (text: string) => string
}

export default function Promo({
  title,
  description,
  linkUrl,
  linkTitle,
  slug,
  icon,
  theme,
  parseUrl,
  trackNavClickEvent,
  v,
}: PromoProps) {
  const handleClick = useCallback((title, linkUrl, linkTitle, slug) => {
    if (window && window.analytics) {
      window.analytics.track('Nav Promo', {
        url: linkUrl,
        title: title,
        callout: linkTitle,
      })

      trackNavClickEvent && trackNavClickEvent(title, linkUrl, slug)
    }
  }, [])

  return (
    <div className={s.promo}>
      {icon && (
        <div
          className={classNames(s.icon, {
            [s.hashidays]: v ? v(theme) : theme === 'hashidays',
            [s.hashiconf]: v ? v(theme) : theme === 'hashiconf',
          })}
        >
          <FlightIcon name={v ? v(icon) : icon} />
        </div>
      )}
      <div className={s.rightContent}>
        <div>
          <div
            className={classNames(s.title, {
              [s.hashidays]: v ? v(theme) : theme === 'hashidays',
              [s.hashiconf]: v ? v(theme) : theme === 'hashiconf',
            })}
          >
            {title}
          </div>
          <div className={s.description}>{description}</div>
        </div>
        <NavigationMenu.Link asChild>
          <Link
            href={parseUrl ? parseUrl(linkUrl).href : linkUrl}
            className={s.link}
            onClickCapture={() => handleClick(title, linkUrl, linkTitle, slug)}
            passHref
          >
            {linkTitle}
            <FlightIcon name="external-link" />
          </Link>
        </NavigationMenu.Link>
      </div>
    </div>
  )
}
