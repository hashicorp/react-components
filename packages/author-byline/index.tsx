import * as React from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import type { AuthorBylineProps } from './types'
import s from './style.module.css'

export default function AuthorByline({
  avatar,
  name,
  role,
  appearance = 'light',
}: AuthorBylineProps): React.ReactElement {
  return (
    <div
      className={classNames(s.authorByline, s[appearance])}
      data-testid="author-byline"
    >
      {avatar ? (
        <span className={s.avatar}>
          <Image
            src={avatar}
            width={52}
            height={52}
            alt={`${name} avatar`}
            objectFit="cover"
          />
        </span>
      ) : null}
      <span className={s.author}>
        <p className={s.name} data-testid="author-byline-name">
          {name}
        </p>
        <p className={s.role} data-testid="author-byline-role">
          {role}
        </p>
      </span>
    </div>
  )
}
