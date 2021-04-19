import React from 'react'
import s from './style.module.css'

function PlaceholderBox({
  prose,
  lines = [],
  repeat = 1,
  width,
  height,
  ...props
}: {
  prose: boolean
  lines: string[]
  repeat: number
} & React.CSSProperties) {
  if (prose)
    return (
      <p className={s.prose}>
        {lines.map((lineWidth, index) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={s.box}
            style={{ width: lineWidth, height: '1rem', ...props }}
          />
        ))}
      </p>
    )

  return Array.from({ length: repeat }).map((el, index) => (
    <div
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      className={s.box}
      style={{ width, height, ...props }}
    />
  ))
}

export default function Placeholder({
  children,
}: {
  children: (Box: typeof PlaceholderBox) => React.ReactNode
  className: string
}): React.ReactNode {
  return children(PlaceholderBox)
}
