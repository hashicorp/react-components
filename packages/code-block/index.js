import React, { Component } from 'react'
import Tippy from '@tippy.js/react'
import hljs from 'highlight.js/lib/highlight'
import bash from 'highlight.js/lib/languages/bash'
import ebnf from 'highlight.js/lib/languages/ebnf'
import go from 'highlight.js/lib/languages/go'
import javascript from 'highlight.js/lib/languages/javascript'
import ruby from 'highlight.js/lib/languages/ruby'
import shell from 'highlight.js/lib/languages/shell'
import sentinel from './languages/sentinel'
import fragment from './fragment.graphql'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('ebnf', ebnf)
hljs.registerLanguage('go', go)
hljs.registerLanguage('hcl', ruby)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('sentinel', sentinel)
hljs.registerLanguage('shell', shell)

class CodeBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tooltip: 'Copy to Clipboard'
    }

    this.copyToClipboard = this.copyToClipboard.bind(this)
  }

  copyToClipboard() {
    // we could use the newer clipboard API... but it's
    // still fairly new, so legacy support FTW!
    const el = document.createElement('textarea')
    el.value = this.props.code
    document.body.appendChild(el)
    el.select()
    try {
      document.execCommand('copy')
      this.setState({ tooltip: 'Copied!' })
    } catch (ex) {
      this.setState({ tooltip: 'Failed to Copy' })
    }

    document.body.removeChild(el)
    setTimeout(() => this.setState({ tooltip: 'Copy to Clipboard' }), 3000)
  }

  render() {
    return (
      <code
        className={`g-code-block${
          this.props.prefix ? ' ' + this.props.prefix : ''
        }`}
      >
        <ol className={this.props.prefix}>
          {hljs
            .highlightAuto(this.props.code, [
              this.props.language ? this.props.language : null
            ])
            .value.split('\n')
            .map((l, stableIdx) => (
              // eslint-disable-next-link react/no-array-index-as-key
              <li key={stableIdx} dangerouslySetInnerHTML={{ __html: l }} />
            ))}
        </ol>
        <Tippy
          content={this.state.tooltip}
          animation="fade"
          arrow={true}
          distance={10}
          placement="top"
          hideOnClick={false}
          size="small"
        >
          <span className="g-tooltip" onClick={this.copyToClipboard} />
        </Tippy>
      </code>
    )
  }
}

CodeBlock.fragmentSpec = { fragment }

export default CodeBlock
