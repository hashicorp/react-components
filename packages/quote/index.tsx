/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import * as React from 'react'
import classNames from 'classnames'
import AuthorByline from '@hashicorp/react-author-byline'
import type { QuoteProps } from './types'
import s from './style.module.css'

const gaps: {
  [K in NonNullable<QuoteProps['textSize']>]: `${number}px`
} = {
  4: '32px',
  5: '24px',
}

export default function Quote({
  textSize = 4,
  text,
  avatar,
  name,
  role,
  appearance = 'light',
}: QuoteProps) {
  const textSizeClassName = `g-type-display-${textSize}`
  return (
    <figure
      className={classNames(s.quote, s[appearance])}
      style={
        {
          '--gap': gaps[textSize],
        } as React.CSSProperties
      }
      data-testid="quote"
    >
      <blockquote className={classNames(s.text, textSizeClassName)}>
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
