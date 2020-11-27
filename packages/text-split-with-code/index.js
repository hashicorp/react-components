import TextSplit from '@hashicorp/react-text-split'
import CodeBlock from '@hashicorp/react-code-block'

function TextSplitWithCode({ textSplit, codeBlock }) {
  return (
    <TextSplit {...textSplit}>
      <CodeBlock {...codeBlock} />
    </TextSplit>
  )
}

TextSplitWithCode.defaultProps = {}
export default TextSplitWithCode
