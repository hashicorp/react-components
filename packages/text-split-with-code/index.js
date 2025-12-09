/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import TextSplit from '@hashicorp/react-text-split'
import CodeBlock from '@hashicorp/react-code-block'

function TextSplitWithCode({ className, textSplit, codeBlock }) {
  return (
    <TextSplit className={className} {...textSplit}>
      <CodeBlock {...codeBlock} />
    </TextSplit>
  )
}

TextSplitWithCode.defaultProps = {}
export default TextSplitWithCode
