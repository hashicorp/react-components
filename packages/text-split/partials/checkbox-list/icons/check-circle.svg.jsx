import React from 'react'

function CheckCircleBlack({ title, ...props }) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-labelledby="title"
      {...props}
    >
      {title === undefined ? (
        <title id="title">{'check-circle logo'}</title>
      ) : title ? (
        <title id="title">{title}</title>
      ) : null}
      <path
        id="circle"
        d="M21 12.07V13a10 10 0 11-5.93-9.14"
        stroke={props.color || '#000'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="check"
        d="M8 12l3 3L22 4"
        stroke={props.color || '#000'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CheckCircleBlack
