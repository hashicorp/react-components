import Table from './components/table'
import Tabs from './components/tabs'
import DownloadBlock from './components/download-block'
import { PricingFeaturesProps } from './types'
import { normalizeTableData } from './helpers'
import s from './style.module.css'

export default function PricingFeatures({
  features,
  download,
  tableColHeadersRef,
}: PricingFeaturesProps) {
  return (
    <section className={s.features} data-testid="pricing-features">
      {features.map(({ heading, footnote, content }, idx) => (
        <div className={s.content} key={heading}>
          <h2 className={s.heading}>{heading}</h2>
          {'tabs' in content ? (
            <Tabs
              tabs={content.tabs.map((tab) => ({
                label: tab.label,
                content: <Table {...tab.content.table} />,
              }))}
              contentRef={
                idx === 0 && tableColHeadersRef ? tableColHeadersRef : null
              }
            />
          ) : (
            <Table
              {...content.table}
              contentRef={
                idx === 0 && tableColHeadersRef ? tableColHeadersRef : null
              }
            />
          )}
          {footnote && (
            <div className={s.footnoteContainer}>
              <div
                className={s.footnote}
                dangerouslySetInnerHTML={{ __html: footnote }}
              />
            </div>
          )}
        </div>
      ))}
      <div className={s.downloadBlock}>
        <DownloadBlock {...download} />
      </div>
    </section>
  )
}

export { Table, Tabs, DownloadBlock, normalizeTableData }
