/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import React from 'react'
import ClipboardButton from '../clipboard-button'
import s from './style.module.css'

function FileIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        fill="#000"
        fillRule="evenodd"
        d="M6 2.08a2.75 2.75 0 0 0-2.75 2.75v16A2.75 2.75 0 0 0 6 23.58h12a2.75 2.75 0 0 0 2.75-2.75v-11a.748.748 0 0 0-.22-.53l-7-7a.751.751 0 0 0-.53-.22m-.75 1.5H6c-.69 0-1.25.56-1.25 1.25v16c0 .691.56 1.25 1.25 1.25h12c.69 0 1.25-.559 1.25-1.25V10.58H13a.75.75 0 0 1-.75-.75V3.58Zm5.94 5.5-4.44-4.439v4.44h4.44Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function SnippetBar({ showChrome, filename, getText, heading, showClipboard }) {
  if (showClipboard && !getText) {
    throw new Error(
      `SnippetBar was passed showClipboard without a getText function. To use the clipboard button, please also pass a getText() function, which should return [err, text], where text will be copied to the clipboard if err is falsy.`
    )
  }

  return (
    <div className={s.root}>
      <div className={s.leftSide}>
        {showChrome ? (
          <div className={s.chrome}>
            <div className={s.chromeDot}></div>
            <div className={s.chromeDot}></div>
            <div className={s.chromeDot}></div>
          </div>
        ) : null}
        {filename ? (
          <div className={s.filename}>
            <FileIcon />
            {filename}
          </div>
        ) : null}
        {heading ? <div className={s.heading}>{heading}</div> : null}
      </div>
      <div className={s.rightSide}>
        {showClipboard ? (
          <div className={s.copyBtnContainer}>
            <ClipboardButton getText={getText} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default SnippetBar
