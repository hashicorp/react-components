import React from 'react'
import ClipboardButton from '../clipboard-button'
import InlineSvg from '@hashicorp/react-inline-svg'
import svgFile from './svg/file.svg.js'
import svgGithub from './svg/github.svg.js'

import s from './style.module.css'

function MetaBarSingle({
  chrome,
  filename,
  getText,
  heading,
  onCopiedStateChange,
  showClipboard,
  sourceUrl,
}) {
  const resolvedFilename = sourceUrl ? sourceUrl.split('/').pop() : filename

  if (showClipboard && !getText) {
    throw new Error(
      `MetaBarSingle was passed showClipboard without a getText function. To use the clipboard button, please also pass a getText() function, which should return [err, text], where text will be copied to the clipboard if err is falsy.`
    )
  }

  return (
    <div className={s.root}>
      <div className={s.leftSide}>
        {chrome ? (
          <div className={s.chrome}>
            <div className={s.chromeDot}></div>
            <div className={s.chromeDot}></div>
            <div className={s.chromeDot}></div>
          </div>
        ) : null}
        {resolvedFilename ? (
          <div className={s.filename}>
            <InlineSvg src={svgFile} />
            {resolvedFilename}
          </div>
        ) : null}
        {heading ? <div className={s.heading}>{heading}</div> : null}
      </div>
      <div className={s.rightSide}>
        {sourceUrl ? (
          <a href={sourceUrl} className={s.sourceLink}>
            View Source
            <InlineSvg src={svgGithub} />
          </a>
        ) : null}
        {showClipboard ? (
          <div className={s.copyBtnContainer}>
            <ClipboardButton
              getText={getText}
              onCopiedStateChange={onCopiedStateChange}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default MetaBarSingle
