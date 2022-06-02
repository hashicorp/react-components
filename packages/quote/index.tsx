import classNames from 'classnames'
import AuthorByline from '@hashicorp/react-author-byline'
import type { QuoteProps } from './types'
import s from './style.module.css'

export default function Quote({
  text,
  avatar,
  name,
  role,
  appearance = 'light',
}: QuoteProps) {
  return (
    <figure className={classNames(s.quote, s[appearance])} data-testid="quote">
      <blockquote className={s.text}>
        <p>{text}</p>
      </blockquote>
      <figcaption className={s.caption}>
        <AuthorByline
          avatar={avatar}
          name={name}
          role={role}
          appearance={appearance}
        />
      </figcaption>
    </figure>
  )
}
