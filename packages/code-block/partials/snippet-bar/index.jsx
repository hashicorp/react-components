import React from 'react'
import ClipboardButton from '../clipboard-button'
import InlineSvg from '@hashicorp/react-inline-svg'
import svgFile from './svg/file.svg?include'

import s from './style.module.css'

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
            <InlineSvg src={svgFile} />
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
