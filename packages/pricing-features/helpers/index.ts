/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { CMSTableProps, TableProps, RowProps, TextCellProps } from '../types'

// Handles formatting of data returned by DatoCMS
// example:
// {
//   hasColumnHeaders: true,
//   collapsibleRows: [0],
//   table: {
//    columns: ['','Col 1', 'Col 2']},
//    data: [{
//      '': { heading: 'Row'}, 'Col 1': true, 'Col 2': false
//    }]
//   }
// }
// -->
// {
//   columns: ['','Col 1', 'Col 2'],
//   rows: [
//     {
//       header: { heading: 'Row heading', content: ''},
//       isCollapsible: true,
//       cells: [true, false]
//     }
//   ]
// }

export function normalizeTableData({
  hasColumnHeaders,
  collapsibleRows,
  table,
}: CMSTableProps): TableProps {
  const { columns, data } = table
  return {
    columns: hasColumnHeaders ? columns : null,
    rows: data.map((row, rowIdx) => {
      return Object.keys(row).reduce((acc, key) => {
        if (key === columns[0]) {
          acc.header = row[key] as TextCellProps
        } else {
          const arr = acc.cells ? acc.cells : []
          arr[columns.indexOf(key) - 1] = row[key]
          acc.cells = arr
        }
        acc.isCollapsible = collapsibleRows.includes(rowIdx)
        return acc
      }, {} as RowProps)
    }),
  }
}
