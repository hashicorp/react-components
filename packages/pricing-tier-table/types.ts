export type Row = {
  heading: string
  isCollapsible?: boolean
  cells: Array<string | boolean>
}

export interface PricingTierTableProps {
  /**
   * Column heading names
   */
  columns?: Array<string> | null
  /**
   * Table data arranged by rows
   */
  rows: Array<Row>
}
