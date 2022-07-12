export interface PricingTableProps {
  /**
   * Column heading names
   */
  columns?: Array<string>
  /**
   * Table data arranged by rows
   */
  rows: Array<{
    heading: string
    isCollapsible?: boolean
    cells: Array<string | boolean>
  }>
}
