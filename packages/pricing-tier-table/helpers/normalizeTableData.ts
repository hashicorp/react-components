import { Row, TierTableProps } from '../types'

type Record<K extends keyof any, T> = {
  [P in K]: T
}

export type PluginRow = Record<string, any>

interface PluginTableProps {
  collapsibleRows: Array<number>
  hasColumnHeaders: boolean
  table: {
    columns: string[]
    data: PluginRow[]
  }
}

// Handles formatting of data returned by DatoCMS
export function normalizeTableData({
  hasColumnHeaders,
  collapsibleRows,
  table,
}: PluginTableProps): TierTableProps {
  const { columns, data } = table
  return {
    columns: hasColumnHeaders ? columns : null,
    rows: data.map((row, rowIdx) => {
      return Object.keys(row).reduce((acc, key) => {
        if (key === columns[0]) {
          acc.heading = row[key]
        } else {
          const arr = acc.cells ? acc.cells : []
          arr[columns.indexOf(key) - 1] = row[key]
          acc.cells = arr
        }
        acc.isCollapsible = collapsibleRows.includes(rowIdx)
        return acc
      }, {} as Row)
    }),
  }
}
