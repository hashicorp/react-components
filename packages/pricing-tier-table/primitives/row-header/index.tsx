import { IconChevronDown16 } from '@hashicorp/flight-icons/svg-react/chevron-down-16'
import { IconChevronUp16 } from '@hashicorp/flight-icons/svg-react/chevron-up-16'
import { RowHeaderProps } from '../../types'
import s from './style.module.css'

interface RowHeaderCellProps extends RowHeaderProps {
  ariaControls: Array<string>
  colSpan: number
  rowIdx: number
  handleCollapseRow: (number) => void
  rowIsCollapsed: boolean
}

export default function RowHeader({
  header,
  colSpan,
  isCollapsible,
  ariaControls,
  rowIdx,
  handleCollapseRow,
  rowIsCollapsed,
}: RowHeaderCellProps): React.ReactElement {
  return (
    <th scope="row" colSpan={colSpan} className={s.rowHeader}>
      {isCollapsible && (
        <button
          className={s.icon}
          aria-controls={ariaControls.join(' ')}
          aria-expanded="false"
          aria-label="toggle row content"
          onClick={() => handleCollapseRow(rowIdx)}
        >
          {rowIsCollapsed ? <IconChevronUp16 /> : <IconChevronDown16 />}
        </button>
      )}
      <div className={s.rowHeaderText}>
        <div className={s.rowHeading}>{header.heading}</div>
        {header.content && (
          <div
            id={`row-${rowIdx}`}
            aria-hidden={rowIsCollapsed}
            className={s.rowContent}
          >
            {header.content}
          </div>
        )}
      </div>
    </th>
  )
}
