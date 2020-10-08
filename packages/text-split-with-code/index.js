import TextSplit from '@hashicorp/react-text-split'
import CodeBlock from '@hashicorp/react-code-block'

function TextSplitWithCode({
  textSplit,
  codeBlock: { chrome, code, language, prefix },
}) {
  return (
    <TextSplit {...textSplit}>
      <div className="g-text-split-with-code">
        {chrome && (
          <div className="chrome-bar">
            <span />
            <span />
            <span />
          </div>
        )}
        <CodeBlock
          code={code}
          prefix={prefix}
          language={language ? language.toLowerCase() : undefined}
        />
      </div>
    </TextSplit>
  )
}

TextSplitWithCode.defaultProps = {}
export default TextSplitWithCode
