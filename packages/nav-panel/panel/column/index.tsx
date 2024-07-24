import React from 'react'
import s from './style.module.css'

export interface NavColumnProps {
  children: React.ReactNode
}

export default function Column({ children }: NavColumnProps) {
  return <div className={s.column}>{children}</div>
}
