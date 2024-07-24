import Link from 'next/link'
import s from './style.module.css'
import FlightIcon from '@hashicorp/react-design-system-components/src/components/flight-icon'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'

export interface LinkListProps {
  links: {
    title: string
    url: string
    icon?: string
    description?: string
    iconGradient?: string
  }[]
  linkClickHandler?: (title: string, url: string) => void
  parseUrl?: (url: string) => {
    linkType: 'inbound' | 'outbound'
    href: string
  }
  v?: (text: string) => string
}

const GRADIENT_VALUE_MAP = new Map([
  [
    'ILM',
    {
      iconGradient:
        'var(--icon-gradient-infrastructure-lifecycle-management, linear-gradient(266.74deg, #fff -54.9%, #b0ffff -5.33%, #8fd0ff 48.57%, #c796ff 100%))',
    },
  ],
  [
    'SLM',
    {
      iconGradient:
        'var(--icon-gradient-security-lifecycle-management, linear-gradient(248.33deg, #fff -29.69%, #fff4ac 18.2%, #ffac99 70.24%, #ff89a1 110.05%))',
    },
  ],
  [
    'Cloud',
    {
      iconGradient:
        'var(--icon-gradient-infrastructure-cloud, linear-gradient(80.71deg, #b0ffff -5.86%, #8fd0ff 13.94%, #ddbfff 35.6%, #ffaed0 66.85%, #ffbeaf 86.02%, #fff8c9 103.33%, #fff 120.12%))',
    },
  ],
])

export default function LinkList({
  links,
  linkClickHandler,
  parseUrl,
  v,
}: LinkListProps) {
  return (
    <ul className={s.linkList}>
      {links.map((link) => {
        let style
        link.iconGradient
          ? (style = {
              '--iconGradient':
                GRADIENT_VALUE_MAP.get(
                  v ? v(link.iconGradient) : link.iconGradient
                )?.iconGradient ?? 'ILM',
            } as React.CSSProperties)
          : (style = null)
        return (
          <li key={link.title}>
            <NavigationMenu.Link asChild>
              <Link
                className={s.link}
                href={parseUrl ? parseUrl(link.url).href : link.url}
                onClickCapture={() => {
                  linkClickHandler && linkClickHandler(link.title, link.url)
                }}
                passHref
              >
                {link.iconGradient && link.icon ? (
                  <div className={s.iconBackground} style={style}>
                    <FlightIcon name={v ? v(link.icon) : link.icon} />
                  </div>
                ) : (
                  link.icon && (
                    <FlightIcon
                      name={v ? v(link.icon) : link.icon}
                      color="var(--token-color-foreground-faint)"
                    />
                  )
                )}
                <div>
                  <div className={link.iconGradient && s.boldTitle}>
                    {link.title}
                  </div>
                  {link.description && (
                    <div className={s.description}>{link.description}</div>
                  )}
                </div>
              </Link>
            </NavigationMenu.Link>
          </li>
        )
      })}
    </ul>
  )
}
