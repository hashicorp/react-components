import { IconXCircle24 } from '@hashicorp/flight-icons/svg-react/x-circle-24'
import { IconCheckCircleFill24 } from '@hashicorp/flight-icons/svg-react/check-circle-fill-24'
import { CellProps } from '../../types'
import s from './style.module.css'

interface TableCellProps extends CellProps {
  rowIdx: number
  cellIdx: number
  rowIsCollapsed: boolean
}

export default function TableCell({
  cell,
  rowIdx,
  cellIdx,
  rowIsCollapsed,
}: TableCellProps): React.ReactElement {
  return (
    <td className={s.tableCell}>
      {typeof cell == 'boolean' ? (
        !cell ? (
          <IconXCircle24 color="var(--wpl-neutral-300)" />
        ) : (
          <IconCheckCircleFill24 color="var(--wpl-green-500)" />
        )
      ) : (
        <div>
          <div className={s.cellHeading}>{cell.heading}</div>
          {cell.content && (
            <div
              id={`row-${rowIdx}-cell-${cellIdx}`}
              className={s.cellContent}
              aria-hidden={rowIsCollapsed}
            >
              <div className={s.cellContent}>{cell.content}</div>
            </div>
          )}
        </div>
      )}
    </td>
  )
}
