import { ReactNode } from 'react'

export interface TextCellProps {
  heading: string
  content?: string
}

export interface TableProps {
  /**
   * Column heading names
   */
  columns?: Array<string> | null
  /**
   * Table data arranged by rows
   */
  rows: Array<{
    header: TextCellProps
    isCollapsible?: boolean
    cells: Array<boolean | TextCellProps>
  }>
}

export interface LabelProps {
  /**
   * Icon as React Element
   */
  icon: ReactNode
  /**
   * Feature name
   */
  heading: string
}

export interface TabsProps {
  tabs: Array<{
    label: LabelProps
    /**
     * Content that belongs to feature (pricing table)
     */
    content: TableProps
  }>
}

export interface FeatureProps {
  heading: string
  content: TableProps | TabsProps
  footnote?: string
}

export interface PricingFeaturesProps {
  features: Array<FeatureProps>
  /**
   * Download section displayed on mobile
   */
  download: {
    heading: string
    description: string
    pdfLink: {
      title: string
      url: string
    }
  }
}

export interface CMSTableProps {
  hasColumnHeaders: boolean
  collapsibleRows: Array<number>
  table: {
    columns: Array<string>
    data: Array<{
      [x: string]: boolean | string
    }>
  }
}
