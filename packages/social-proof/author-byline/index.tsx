import * as React from 'react'
import Image from 'next/image'
import s from './style.module.css'

export default function AuthorByline({
  avatar,
  name,
  role,
}): React.ReactElement {
  return (
    <div className={s.authorByline}>
      <span className={s.avatar}>
        <Image
          src={avatar}
          width={52}
          height={52}
          alt={`${name} avatar`}
          objectFit="cover"
        />
      </span>
      <span className={s.author}>
        <p className={s.name}>{name}</p>
        <p className={s.role}>{role}</p>
      </span>
    </div>
  )
}
