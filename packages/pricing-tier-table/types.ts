export type Row = {
  heading: string
  isCollapsible?: boolean
  cells: Array<string | boolean>
}

export interface TierTableProps {
  /**
   * Column heading names
   */
  columns?: Array<string> | null
  /**
   * Table data arranged by rows
   */
  rows: Array<Row>
}
