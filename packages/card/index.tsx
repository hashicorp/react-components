import type { CardProps } from './types'
import classNames from 'classnames'
import s from './style.module.css'
import Button from 'packages/button'

export default function Card({
  children,
  appearance,
  featured,
  heading,
  description,
  cta,
}: CardProps) {
  return (
    <a
      href={cta.url}
      className={classNames(s.card, s[appearance], featured && s.featured)}
    >
      {children}
      {featured ? null : (
        <>
          <p className={s.heading}>{heading}</p>
          {description ? <p className={s.description}>{description}</p> : null}
        </>
      )}

      <Button title={cta.text || ''} url={cta.url} linkType="inbound" />
    </a>
  )
}

export function Thumbnail({ url }) {
  const isVideo = ['mp4', 'webm'].includes(parseFormat(url))

  return (
    <div className={s.thumbnail}>
      {isVideo ? <div>Play button</div> : null}
      JSX for the thumbnail
    </div>
  )
}

export function Meta({ date, category }) {
  const meta = date && category ? `${date} | ${category}` : date || category

  return <div className={s.meta}>{meta}</div>
}

export function Badges({ badges }) {
  return (
    <ul className={s.badges}>
      {badges.map(({ label, product }) => {
        return (
          <li key={label}>
            <span>{product}</span>
            <span>{label}</span>
          </li>
        )
      })}
    </ul>
  )
}

// DUPLICATE FUNCTION
// Lifted from packages/image
function parseFormat(url) {
  const extensionMatch = url.match(/\.(\w+)$/)
  const hasExtension = !!extensionMatch && !!extensionMatch[1]
  return hasExtension ? extensionMatch[1] : false
}
