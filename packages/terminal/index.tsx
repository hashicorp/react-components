import { Fragment } from 'react'
import useProductMeta from '@hashicorp/platform-product-meta'
import type { Products } from '@hashicorp/platform-product-meta'
import classNames from 'classnames'
import s from './style.module.css'

interface CommandLineTerminalProps {
  lines: { color: 'navy' | 'gray' | 'white'; code: string; short?: boolean }[]
  title?: string
  noScroll?: boolean
  product: Products
}

export default function CommandLineTerminal({
  lines,
  title,
  noScroll,
  product,
}: CommandLineTerminalProps) {
  const { themeClass } = useProductMeta(product)
  return (
    <div
      className={`${s.terminal} ${themeClass || ''}`}
      data-testid="terminal-root"
    >
      <div className={s.titleBar}>
        <ul className={s.windowControls}>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        {title && <div className={s.title}>{title}</div>}
      </div>
      <div className={s.content}>
        <div
          className={noScroll ? s.noScrollOverflowWrapper : s.overflowWrapper}
        >
          <div className={s.codeWrapper}>
            {lines &&
              lines.map((line, index) => (
                // This array is stable, so we can use index as key
                // eslint-disable-next-line react/no-array-index-key
                <Fragment key={index}>
                  <pre
                    className={classNames({
                      [s.short]: line.short,
                      [s.navy]: line.color === 'navy',
                      [s.gray]: line.color === 'gray',
                      [s.white]: line.color === 'white',
                    })}
                  >
                    {line.code}
                  </pre>
                </Fragment>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
