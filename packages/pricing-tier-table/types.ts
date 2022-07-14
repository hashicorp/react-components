import { ReactNode } from 'react'

export type Row = {
  header: {
    heading: ReactNode
    content?: ReactNode
  }
  isCollapsible?: boolean
  cells: Array<
    | boolean
    | {
        heading?: ReactNode
        content: ReactNode
      }
  >
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
