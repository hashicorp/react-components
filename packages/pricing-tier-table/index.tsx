import { useState } from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import { IconChevronUp16 } from '@hashicorp/flight-icons/svg-react/chevron-up-16'
import { IconChevronDown16 } from '@hashicorp/flight-icons/svg-react/chevron-down-16'
import { IconXCircle24 } from '@hashicorp/flight-icons/svg-react/x-circle-24'
import { IconCheckCircleFill24 } from '@hashicorp/flight-icons/svg-react/check-circle-fill-24'
import { TierTableProps } from './types'
import s from './style.module.css'

export default function PricingTierTable({
  columns,
  rows,
}: TierTableProps): React.ReactElement {
  const [collapsedRows, setCollapsedRows] = useState<Array<number>>([])
  const hasColumnHeaders = !!columns && columns.length > 0
  const colLength = rows[0].cells.length

  if (colLength > 5) {
    throw new Error('<TierTable /> only supports up to five tiers')
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
      className={s.pricingTierTableContainer}
      style={
        {
          '--col-gap': colLength === 2 ? '34px' : '22px',
        } as React.CSSProperties
      }
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
                      <div className={s.columnHeading}>
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
            {rows.map(({ heading, cells, isCollapsible }, rowIndex) => {
              const rowIsCollapsed = collapsedRows.includes(rowIndex)
              return (
                <tr
                  key={heading}
                  className={rowIsCollapsed && s.rowIsCollapsed}
                >
                  <th scope="row" colSpan={colLength > 3 ? 2 : 1}>
                    {isCollapsible && (
                      <button
                        className={s.icon}
                        onClick={() => handleCollapseRow(rowIndex)}
                      >
                        {rowIsCollapsed ? (
                          <IconChevronUp16 />
                        ) : (
                          <IconChevronDown16 />
                        )}
                      </button>
                    )}
                    <div
                      className={s.rowHeading}
                      dangerouslySetInnerHTML={{ __html: heading }}
                    />
                  </th>
                  {cells.map((cell) => {
                    return (
                      <td key={`${heading}-${cell}`}>
                        {typeof cell == 'boolean' ? (
                          !cell ? (
                            <IconXCircle24 color="var(--wpl-neutral-300)" />
                          ) : (
                            <IconCheckCircleFill24 color="var(--wpl-green-500)" />
                          )
                        ) : (
                          <div
                            className={s.textCell}
                            dangerouslySetInnerHTML={{ __html: cell }}
                          />
                        )}
                      </td>
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
