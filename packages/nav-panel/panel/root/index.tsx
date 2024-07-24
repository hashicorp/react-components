import React from 'react'
import s from './style.module.css'

interface RootProps {
  children: React.ReactNode
}

export default function Root({ children }: RootProps) {
  return <div className={s.root}>{children}</div>
}
