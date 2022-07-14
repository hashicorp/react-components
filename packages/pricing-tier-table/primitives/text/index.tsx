import s from './style.module.css'

interface TextProps {
  text: string
}

export function RowHeading({ text }: TextProps) {
  return <h3 className={s.rowHeading}>{text}</h3>
}

export function RowContent({ text }: TextProps) {
  return <h3 className={s.rowContent}>{text}</h3>
}

export function CellHeading({ text }: TextProps) {
  return <h3 className={s.cellHeading}>{text}</h3>
}

export function CellContent({ text }: TextProps) {
  return <h3 className={s.cellContent}>{text}</h3>
}
