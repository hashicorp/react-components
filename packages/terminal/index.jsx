import { Fragment } from 'react'
import useProductMeta from '@hashicorp/nextjs-scripts/lib/providers/product-meta'
import classNames from 'classnames'
import styles from './Terminal.module.css'

export default function CommandLineTerminal({
  lines,
  title,
  noScroll,
  product,
}) {
  const { themeClass } = useProductMeta(product)
  return (
    <div
      className={`${styles.terminal} ${themeClass || ''}`}
      data-testid="terminal-root"
    >
      <div className={styles.titleBar}>
        <ul className={styles.windowControls}>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        {title && <div className={styles.title}>{title}</div>}
      </div>
      <div className={styles.content}>
        <div
          className={
            noScroll ? styles.noScrollOverflowWrapper : styles.overflowWrapper
          }
        >
          <div className={styles.codeWrapper}>
            {lines &&
              lines.map((line, index) => (
                // This array is stable, so we can use index as key
                // eslint-disable-next-line react/no-array-index-key
                <Fragment key={index}>
                  <pre
                    className={classNames({
                      [styles.short]: line.short,
                      [styles.navy]: line.color === 'navy',
                      [styles.gray]: line.color === 'gray',
                      [styles.white]: line.color === 'white',
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
