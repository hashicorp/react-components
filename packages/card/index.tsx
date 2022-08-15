import Image from 'next/image'
import type {
  CardProps,
  ThumbnailProps,
  MetaProps,
  ContentProps,
} from './types'
import classNames from 'classnames'
import { IconArrowRight24 } from '@hashicorp/flight-icons/svg-react/arrow-right-24'
import s from './style.module.css'

function Card({ children, appearance, featured, cta }: CardProps) {
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

function Thumbnail({ image, url }: ThumbnailProps) {
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

function Meta({ date, category }: MetaProps) {
  const meta = date && category ? `${date} | ${category}` : date || category

  return <div className={s.meta}>{meta}</div>
}

function Content({ heading, description }: ContentProps) {
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

Card.Thumbnail = Thumbnail
Card.Meta = Meta
Card.Content = Content

export default Card
