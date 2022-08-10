import { useState } from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import { IconXCircle24 } from '@hashicorp/flight-icons/svg-react/x-circle-24'
import { IconCheckCircleFill24 } from '@hashicorp/flight-icons/svg-react/check-circle-fill-24'
import { IconChevronUp16 } from '@hashicorp/flight-icons/svg-react/chevron-up-16'
import { IconChevronDown16 } from '@hashicorp/flight-icons/svg-react/chevron-down-16'
import { TableProps, TextCellProps } from '../../types'
import s from './style.module.css'

export default function PricingTierTable({
  columns,
  rows,
}: TableProps): React.ReactElement {
  const [collapsedRows, setCollapsedRows] = useState<Array<number>>([])
  const hasColumnHeaders = !!columns && columns.length > 0
  const colLength = rows[0].cells.length

  if (colLength > 5) {
    throw new Error('<PricingTierTable /> only supports up to five tiers')
  }

  function handleCollapseRow(idx: number) {
    if (collapsedRows.includes(idx)) {
      const updatedCollapsedRows = [...collapsedRows]
      const currentCollapsibleRowIdx = updatedCollapsedRows.indexOf(idx)
      updatedCollapsedRows.splice(currentCollapsibleRowIdx, 1)
      setCollapsedRows(updatedCollapsedRows)
    } else {
      setCollapsedRows([...collapsedRows, idx])
    }
  }

  return (
    <div
      className={s.pricingTable}
      style={
        {
          '--col-gap': colLength === 2 ? '34px' : '22px',
        } as React.CSSProperties
      }
      data-testid="pricing-table"
    >
      <div className={s.table}>
        <table>
          {hasColumnHeaders && (
            <thead>
              <tr>
                {columns.map((col, colIdx) => (
                  <th
                    key={col}
                    scope="col"
                    colSpan={colIdx === 0 && colLength > 3 ? 2 : 1}
                  >
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
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {rows.map(({ header, cells, isCollapsible }, rowIdx) => {
              const cellIds = cells.map(
                (cell, idx) => `row-${rowIdx}-cell-${idx}`
              )
              const ariaControls = [...cellIds, `row-${rowIdx}`]
              const rowIsCollapsed = collapsedRows.includes(rowIdx)

              return (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={`row-${rowIdx}`}>
                  <RowHeader
                    header={header}
                    isCollapsible={isCollapsible}
                    rowIdx={rowIdx}
                    ariaControls={ariaControls}
                    colSpan={colLength > 3 ? 2 : 1}
                    handleCollapseRow={handleCollapseRow}
                    rowIsCollapsed={rowIsCollapsed}
                  />
                  {cells.map((cell, cellIdx) => {
                    return (
                      <Cell
                        // eslint-disable-next-line react/no-array-index-key
                        key={`row-${rowIdx}-cell-${cellIdx}`}
                        rowIdx={rowIdx}
                        cellIdx={cellIdx}
                        cell={cell}
                        rowIsCollapsed={rowIsCollapsed}
                      />
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

interface CellProps {
  cell: boolean | TextCellProps
  rowIdx: number
  cellIdx: number
  rowIsCollapsed: boolean
}

function Cell({
  cell,
  rowIdx,
  cellIdx,
  rowIsCollapsed,
}: CellProps): React.ReactElement {
  return (
    <td className={s.cell}>
      {typeof cell == 'boolean' ? (
        !cell ? (
          <IconXCircle24 color="var(--wpl-neutral-300)" />
        ) : (
          <IconCheckCircleFill24 color="var(--wpl-green-500)" />
        )
      ) : (
        <div>
          <div
            className={s.cellHeading}
            dangerouslySetInnerHTML={{ __html: cell.heading }}
          />
          {cell.content && (
            <div
              id={`row-${rowIdx}-cell-${cellIdx}`}
              className={s.cellContent}
              aria-hidden={rowIsCollapsed}
              dangerouslySetInnerHTML={{ __html: cell.content }}
            />
          )}
        </div>
      )}
    </td>
  )
}

interface RowHeaderProps {
  header: TextCellProps
  colSpan: number
  isCollapsible?: boolean
  ariaControls: Array<string>
  rowIdx: number
  handleCollapseRow: (idx: number) => void
  rowIsCollapsed: boolean
}

function RowHeader({
  header,
  colSpan,
  isCollapsible,
  ariaControls,
  rowIdx,
  handleCollapseRow,
  rowIsCollapsed,
}: RowHeaderProps): React.ReactElement {
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
        <div
          className={s.rowHeading}
          dangerouslySetInnerHTML={{ __html: header.heading }}
        />
        {header.content && (
          <div
            id={`row-${rowIdx}`}
            aria-hidden={rowIsCollapsed}
            className={s.rowContent}
            dangerouslySetInnerHTML={{ __html: header.content }}
          />
        )}
      </div>
    </th>
  )
}
