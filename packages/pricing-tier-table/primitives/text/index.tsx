import { ReactNode } from 'react'
import s from './style.module.css'

interface TextProps {
  children: string | ReactNode
}

export function RowHeaderHeading({ children }: TextProps) {
  return <div className={s.rowHeading}>{children}</div>
}

export function RowHeaderContent({ children }: TextProps) {
  return <div className={s.rowContent}>{children}</div>
}

export function CellHeading({ children }: TextProps) {
  return <div className={s.cellHeading}>{children}</div>
}

export function CellContent({ children }: TextProps) {
  return <div className={s.cellContent}>{children}</div>
}
