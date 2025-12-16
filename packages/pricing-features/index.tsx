/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Table from './components/table'
import Tabs from './components/tabs'
import DownloadBlock from './components/download-block'
import StickyTiers from './components/sticky-tiers'
import { PricingFeaturesProps } from './types'
import { normalizeTableData } from './helpers'
import s from './style.module.css'

export default function PricingFeatures({
  features,
  download,
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
            />
          ) : (
            <Table {...content.table} />
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

export { Table, Tabs, DownloadBlock, StickyTiers, normalizeTableData }
