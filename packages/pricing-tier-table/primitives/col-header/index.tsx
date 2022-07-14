import VisuallyHidden from '@reach/visually-hidden'
import s from './style.module.css'

interface ColHeaderProps {
  col: string
  colSpan: number
}

export default function ColHeader({
  col,
  colSpan,
}: ColHeaderProps): React.ReactElement {
  return (
    <th key={col} scope="col" colSpan={colSpan} className={s.colHeader}>
      {col.length ? (
        <div className={s.colHeaderText}>
          <span>{col}</span>
        </div>
      ) : (
        <VisuallyHidden>
          <span>Title Column</span>
        </VisuallyHidden>
      )}
    </th>
  )
}
