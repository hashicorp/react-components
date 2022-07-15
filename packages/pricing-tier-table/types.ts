export interface TextCellProps {
  heading: string
  content?: string
}

export interface CellProps {
  cell: boolean | TextCellProps
}

export interface RowHeaderProps {
  header: TextCellProps
  isCollapsible?: boolean
}

export interface RowProps extends RowHeaderProps {
  cells: Array<boolean | TextCellProps>
}

export interface PricingTierTableProps {
  /**
   * Column heading names
   */
  columns?: Array<string> | null
  /**
   * Table data arranged by rows
   */
  rows: Array<RowProps>
}
