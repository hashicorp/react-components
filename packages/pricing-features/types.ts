import { LegacyRef, ReactNode } from 'react'

export interface TextCellProps {
  heading: string
  content?: string
}

interface StickyTableHeaderTiers {
  title: string
  cta: {
    title: string
    url: string
  }
}

export interface TableComponentProps {
  /**
   * Refs used to detect in view for sticky headers table
   */
  colHeaderRef?: LegacyRef<HTMLTableSectionElement> | undefined
  tableRef?: LegacyRef<HTMLTableSectionElement> | undefined
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
export interface StickyHeadersTableProps {
  tiers: Array<StickyTableHeaderTiers>
  /**
   * Column heading names
   */
  columns: Array<string>
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
    content: StickyHeadersTableProps
  }>
}

export interface FeatureProps {
  heading: string
  content: StickyHeadersTableProps | TabsProps
  footnote?: string
}

export interface DownloadProps {
  heading: string
  description: string
  pdfLink: {
    title: string
    url: string
  }
}

export interface PricingFeaturesProps {
  features: Array<FeatureProps>
  /**
   * Download section displayed on mobile
   */
  download: DownloadProps
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
