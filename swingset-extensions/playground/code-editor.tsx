/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { useCallback } from 'react'
import { CodeEditor, useActiveCode } from '@codesandbox/sandpack-react'

function debounce(fn: (...args: any[]) => void, ms) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      // @ts-expect-error -- strange this error
      fn.apply(this, args)
    }, ms)
  }
}

const PlaygroundEditor = ({ language }) => {
  const { code, updateCode } = useActiveCode()

  const debouncedUpdateCode = useCallback(debounce(updateCode, 500), [
    updateCode,
  ])

  return (
    <CodeEditor
      code={code}
      initMode="lazy"
      fileType={language}
      onCodeUpdate={(code) => {
        debouncedUpdateCode(code)
      }}
      showLineNumbers
    />
  )
}

export default PlaygroundEditor
