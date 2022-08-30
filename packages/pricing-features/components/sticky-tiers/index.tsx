import Link from 'next/link'
import classNames from 'classnames'
import VisuallyHidden from '@reach/visually-hidden'
import s from './style.module.css'

export interface StickyTiersProps {
  tiers: Array<{
    title: string
    cta: {
      title: string
      url: string
      onClick: () => void
    }
  }>
  isVisible?: boolean
}

export default function StickyTiers({
  tiers,
  isVisible = false,
}: StickyTiersProps) {
  const tiersCount = tiers.length

  if (tiersCount > 5) {
    throw new Error('<StickyTiers /> only supports up to five tiers')
  }

  return (
    <div
      className={classNames(s.stickyTiers, isVisible && s.isVisible)}
      style={
        {
          '--grid-template-columns':
            tiersCount > 3
              ? `2fr repeat(${tiersCount}, 1fr)`
              : `repeat(${tiersCount + 1}, 1fr)`,
          '--col-gap': tiersCount === 2 ? '34px' : '22px',
        } as React.CSSProperties
      }
      // content in this component is available in other parts of the page
      aria-hidden={true}
    >
      <div className={s.inner}>
        <div>
          <VisuallyHidden>
            <span>Empty Space</span>
          </VisuallyHidden>
        </div>
        {tiers.map(({ title, cta }) => (
          <div key={title} className={s.tier}>
            <p className={s.tierName}>{title}</p>
            <div className={s.cta}>
              <Link href={cta.url}>
                <a>{cta.title}</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
