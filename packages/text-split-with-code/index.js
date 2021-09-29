import TextSplit from '@hashicorp/react-text-split'
import CodeBlock from '@hashicorp/react-code-block'

function TextSplitWithCode({ className, textSplit, codeBlock }) {
  return (
    <TextSplit {...textSplit} className={className}>
      <CodeBlock {...codeBlock} />
    </TextSplit>
  )
}

TextSplitWithCode.defaultProps = {}
export default TextSplitWithCode
