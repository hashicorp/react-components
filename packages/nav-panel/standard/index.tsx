import * as NavPanel from '../panel'
import LinkList, { type LinkListProps } from '../link-list'
import Promo, { type PromoProps } from '../promo'
import s from './style.module.css'

interface StandardPanelProps {
  navData: { navItems: LinkListProps['links'] }[]
  promo?: PromoProps
  sectionName?: string
  trackNavClickEvent?: (name: string, href: string, section?: string) => void
  parseUrl?: (url: string) => {
    linkType: 'inbound' | 'outbound'
    href: string
  }
  v?: (text: string) => string
}

const StandardPanel = ({
  navData,
  promo,
  sectionName = '',
  trackNavClickEvent,
  parseUrl,
  v,
}: StandardPanelProps) => {
  return (
    <NavPanel.Root>
      <div className={s.columns}>
        {navData.map(({ navItems }, stableIdx) => {
          return (
            <NavPanel.Column key={stableIdx}>
              <LinkList
                links={navItems}
                linkClickHandler={(text, href) => {
                  trackNavClickEvent &&
                    trackNavClickEvent(text, href, sectionName)
                }}
                parseUrl={parseUrl}
                v={v}
              />
            </NavPanel.Column>
          )
        })}
      </div>

      {promo ? <Promo {...promo} /> : null}
    </NavPanel.Root>
  )
}

export default StandardPanel
