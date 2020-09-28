import React from 'react'

export default function Content({ content, product }) {
  return (
    <article className={`g-content g-type-long-body ${product ? product : ''}`}>
      {content}
    </article>
  )
}
