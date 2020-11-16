import { Fragment } from 'react'
import classNames from 'classnames'
import styles from './Terminal.module.css'

export default function CommandLineTerminal({ lines, title, noScroll, theme }) {
  return (
    <div
      className={`${styles.terminal} ${theme ? theme : ''}`}
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
