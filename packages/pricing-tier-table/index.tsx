import { useState } from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import Button from '@hashicorp/react-button'
import { PricingTierTableProps } from './types'
import s from './style.module.css'
import RowCell from './primitives/row-cell'
import RowHeader from './primitives/row-header'

export default function PricingTierTable({
  columns,
  rows,
  downloadSection,
}: PricingTierTableProps): React.ReactElement {
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
    <>
      <div
        className={s.pricingTierTableContainer}
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
                        <RowCell
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
      <div className={s.downloadContainer}>
        <div className={s.downloadInner}>
          <h2 className={s.downloadHeading}>{downloadSection.heading}</h2>
          <p className={s.downloadDescription}>{downloadSection.description}</p>
          <Button
            title={downloadSection.pdfLink.title}
            url={downloadSection.pdfLink.url}
          />
        </div>
      </div>
    </>
  )
}
