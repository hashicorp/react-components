import Image from 'next/image'
import type { CardProps, MetaProps, ThumbnailProps } from './types'
import classNames from 'classnames'
import { IconArrowRight24 } from '@hashicorp/flight-icons/svg-react/arrow-right-24'
import s from './style.module.css'

export default function Card({
  children,
  appearance,
  featured,
  cta,
}: CardProps) {
  return (
    <a
      href={cta.url}
      className={classNames(s.card, s[appearance], featured && s.featured)}
    >
      {children}
      <div className={s.cta}>
        {cta.title ? <span>{cta.title}</span> : null} <IconArrowRight24 />
      </div>
    </a>
  )
}

export function Thumbnail({ image, url }: ThumbnailProps) {
  // TODO Refine this parse
  const isVideo =
    ['mp4', 'webm'].includes(parseFormat(url)) || url.includes('youtu')

  return (
    <a href={url} className={s.thumbnail} target="_blank" rel="noreferrer">
      {isVideo ? <div>Play button</div> : null}
      {/* TODO Determine more scalable sizing solution for thumbnail (fixed sizes for all?) */}
      <div className={s.image}>
        <Image
          src={image.src}
          alt={image.alt}
          width={800}
          height={600}
          objectFit="cover"
        />
      </div>
    </a>
  )
}

export function Meta({ date, category }: MetaProps) {
  const meta = date && category ? `${date} | ${category}` : date || category

  return <div className={s.meta}>{meta}</div>
}

export function Content({ heading, headingLevel, description }) {
  return (
    <div className={s.content}>
      <p className={s.heading}>{heading}</p>
      {description ? <p className={s.description}>{description}</p> : null}
    </div>
  )
}

// DUPLICATE FUNCTION
// Lifted from packages/image
function parseFormat(url) {
  const extensionMatch = url.match(/\.(\w+)$/)
  const hasExtension = !!extensionMatch && !!extensionMatch[1]
  return hasExtension ? extensionMatch[1] : false
}
