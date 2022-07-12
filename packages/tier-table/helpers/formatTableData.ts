type Record<K extends keyof any, T> = {
  [P in K]: T
}

export type Row = Record<string, any>

interface PluginTableProps {
  collapsibleRows: Array<number>
  hasColumnHeaders: boolean
  table: {
    columns: string[]
    data: Row[]
  }
}

export function formatTableData({
  hasColumnHeaders,
  collapsibleRows,
  table,
}: PluginTableProps) {
  const { columns, data } = table
  return {
    columns: hasColumnHeaders ? columns : null,
    rows: data.map((row, i) => {
      return Object.keys(row).reduce((acc, key) => {
        if (i === 0) {
          acc['name'] = row[key]
        } else {
          acc['cells'] = acc['cells'] ? [...acc['cells'], row[key]] : [row[key]]
        }
        acc['isCollapsible'] = collapsibleRows.includes(i)
        return acc
      }, {})
    }),
  }
}
