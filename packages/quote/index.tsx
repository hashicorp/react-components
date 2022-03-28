import classNames from 'classnames'
import AuthorByline from '@hashicorp/author-byline'
import type { QuoteProps } from './types'
import s from './style.module.css'

export default function Quote({
  text,
  avatar,
  name,
  role,
  variant = 'light',
}: QuoteProps) {
  return (
    <figure className={classNames(s.quote, s[variant])} data-testid="quote">
      <blockquote className={s.text}>
        <p>{text}</p>
      </blockquote>
      <figcaption className={s.caption}>
        <AuthorByline
          avatar={avatar}
          name={name}
          role={role}
          variant={variant}
        />
      </figcaption>
    </figure>
  )
}
