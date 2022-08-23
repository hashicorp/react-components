import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import classNames from 'classnames'
import Table from '../table'
import { StickyHeadersTableProps } from '../../types'
import s from './style.module.css'

export default function StickyHeadersTable({
  tiers,
  columns,
  rows,
}: StickyHeadersTableProps): React.ReactElement {
  const [colHeaderRef, colHeadersInView] = useInView({
    root: null,
    threshold: 1,
    trackVisibility: true,
    delay: 100,
  })

  const [tableRef, tableInView] = useInView({
    root: null,
    threshold: 0,
    trackVisibility: true,
    delay: 100,
  })

  const tiersLength = tiers.length
  if (tiersLength > 5) {
    throw new Error('<StickyHeadersTable /> only supports up to five tiers')
  }

  if (tiers.length !== columns.filter((col) => col.length > 0).length) {
    throw new Error('Tiers length should equal column headers')
  }

  return (
    <>
      <div
        className={classNames(
          s.stickyHeadersTable,
          !colHeadersInView && tableInView && s.isVisible
        )}
        style={
          {
            '--grid-template-columns':
              tiersLength === 2
                ? 'repeat(3, 1fr)'
                : `2fr repeat(${tiersLength}, 1fr)`,
            '--col-gap': tiersLength === 2 ? '34px' : '22px',
          } as React.CSSProperties
        }
      >
        <div />
        {tiers.map(({ title, cta }) => (
          <div key={title} className={s.tier}>
            <p className={s.tierName}>{title}</p>
            <div className={s.cta}>
              <Link href={cta.url}>
                <a>{cta.title}</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Table
        columns={columns}
        rows={rows}
        colHeaderRef={colHeaderRef}
        tableRef={tableRef}
      />
    </>
  )
}
