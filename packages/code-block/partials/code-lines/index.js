/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

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
  wrapCode,
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
        {lineNumbers && !wrapCode ? (
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
                  wrapCode={false}
                />
              )
            })}
          </span>
        ) : null}
        <span
          className={classNames(s.linesColumn, s.styledScrollbars, {
            [s.wrapCode]: wrapCode,
          })}
        >
          {wrapCode ? (
            <LineSpacer
              lineCount={lineCount}
              hasFloatingCopyButton={hasFloatingCopyButton}
            />
          ) : null}
          <span
            className={classNames(s.linesWrapper, { [s.wrapCode]: wrapCode })}
          >
            {linesOfCode.map((lineChildren, stableIdx) => {
              const number = stableIdx + 1
              const isHighlighted = highlightedLines.indexOf(number) !== -1
              const isNotHighlighted = highlightedLines.length && !isHighlighted
              return (
                // This array is stable, so we can use index as key
                // eslint-disable-next-line react/no-array-index-key
                <div className={s.lineWrapper} key={stableIdx}>
                  {lineNumbers && wrapCode ? (
                    <LineNumber
                      // This array is stable, so we can use index as key
                      // eslint-disable-next-line react/no-array-index-key
                      key={stableIdx}
                      number={number}
                      lineCount={lineCount}
                      isHighlighted={isHighlighted}
                      isNotHighlighted={isNotHighlighted}
                      wrapCode={true}
                    />
                  ) : null}
                  <LineOfCode
                    isHighlighted={isHighlighted}
                    isNotHighlighted={isNotHighlighted}
                    hasFloatingCopyButton={hasFloatingCopyButton}
                    wrapCode={wrapCode}
                  >
                    {lineChildren}
                    {'\n'}
                  </LineOfCode>
                </div>
              )
            })}
          </span>
          {wrapCode ? (
            <LineSpacer
              lineCount={lineCount}
              hasFloatingCopyButton={hasFloatingCopyButton}
            />
          ) : null}
        </span>
      </code>
    </pre>
  )
}

function LineSpacer({ lineCount, hasFloatingCopyButton }) {
  return (
    <div
      className={classNames(s.linesSpacer, {
        [s.wrapCode]: true,
      })}
    >
      <LineNumber
        number=""
        lineCount={lineCount}
        isHighlighted={false}
        isNotHighlighted={true}
        wrapCode={true}
      />
      <LineOfCode
        isHighlighted={false}
        isNotHighlighted={true}
        hasFloatingCopyButton={hasFloatingCopyButton}
        wrapCode={true}
      >
        {''}
        {'\n'}
      </LineOfCode>
    </div>
  )
}

function LineNumber({
  number,
  isHighlighted,
  isNotHighlighted,
  lineCount,
  wrapCode,
}) {
  const padLevel = Math.max(lineCount.toString().length, 1)
  const paddedNumber = number.toString().padEnd(padLevel)
  return (
    <span
      className={classNames(s.LineNumber, {
        [s.isHighlighted]: isHighlighted,
        [s.isNotHighlighted]: isNotHighlighted,
        [s.wrapCode]: wrapCode,
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
  wrapCode,
}) {
  return (
    <span
      className={classNames(s.LineOfCode, {
        [s.isHighlighted]: isHighlighted,
        [s.isNotHighlighted]: isNotHighlighted,
        [s.hasFloatingCopyButton]: hasFloatingCopyButton,
        [s.wrapCode]: wrapCode,
      })}
    >
      {children}
    </span>
  )
}

export default CodeLines
