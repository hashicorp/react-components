import React, { useMemo } from 'react'
import parseHighlightedLines from '../../utils/parse-highlighted-lines'
import splitJsxIntoLines from './utils/split-jsx-into-lines'
import splitHtmlIntoLines from './utils/split-html-into-lines'
import classNames from 'classnames'
import s from './style.module.css'

function CodeLines({
  code,
  language,
  lineNumbers,
  highlight,
  hasFloatingCopyButton,
}) {
  const linesOfCode = useMemo(() => {
    const isHtmlString = typeof code === 'string'
    return isHtmlString ? splitHtmlIntoLines(code) : splitJsxIntoLines(code)
  }, [code])

  const lineCount = linesOfCode.length
  const highlightedLines = parseHighlightedLines(highlight)

  return (
    <pre className={classNames(s.pre, `language-${language}`)}>
      <code className={classNames(s.code, `language-${language}`)}>
        {lineNumbers ? (
          <span className={s.numbersColumn}>
            {linesOfCode.map((_lineChildren, stableIdx) => {
              const number = stableIdx + 1
              const isHighlighted = highlightedLines.indexOf(number) !== -1
              const isNotHighlighted =
                highlightedLines.length > 0 && !isHighlighted
              return (
                <LineNumber
                  // This array is stable, so we can use index as key
                  // eslint-disable-next-line react/no-array-index-key
                  key={stableIdx}
                  number={number}
                  lineCount={lineCount}
                  isHighlighted={isHighlighted}
                  isNotHighlighted={isNotHighlighted}
                />
              )
            })}
          </span>
        ) : null}
        <span className={classNames(s.linesColumn, s.styledScrollbars)}>
          <span className={s.linesWrapper}>
            {linesOfCode.map((lineChildren, stableIdx) => {
              const number = stableIdx + 1
              const isHighlighted = highlightedLines.indexOf(number) !== -1
              const isNotHighlighted = highlightedLines.length && !isHighlighted
              return (
                <LineOfCode
                  // This array is stable, so we can use index as key
                  // eslint-disable-next-line react/no-array-index-key
                  key={stableIdx}
                  isHighlighted={isHighlighted}
                  isNotHighlighted={isNotHighlighted}
                  hasFloatingCopyButton={hasFloatingCopyButton}
                >
                  {lineChildren}
                  {'\n'}
                </LineOfCode>
              )
            })}
          </span>
        </span>
      </code>
    </pre>
  )
}

function LineNumber({ number, isHighlighted, isNotHighlighted, lineCount }) {
  const padLevel = Math.max(lineCount.toString().length, 1)
  const paddedNumber = number.toString().padEnd(padLevel)
  return (
    <span
      className={classNames(s.LineNumber, {
        [s.isHighlighted]: isHighlighted,
        [s.isNotHighlighted]: isNotHighlighted,
      })}
      dangerouslySetInnerHTML={{ __html: paddedNumber }}
    />
  )
}

function LineOfCode({
  children,
  isHighlighted,
  isNotHighlighted,
  hasFloatingCopyButton,
}) {
  return (
    <span
      className={classNames(s.LineOfCode, {
        [s.isHighlighted]: isHighlighted,
        [s.isNotHighlighted]: isNotHighlighted,
        [s.hasFloatingCopyButton]: hasFloatingCopyButton,
      })}
    >
      {children}
    </span>
  )
}

export default CodeLines
