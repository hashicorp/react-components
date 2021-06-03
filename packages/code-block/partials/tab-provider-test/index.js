import { useTabGroups } from '../../provider'
import CodeBlock from '../../'

function TabProviderTest() {
  const { activeTabGroup, setActiveTabGroup } = useTabGroups() || {}

  return (
    <div>
      <div className="g-type-label">Tab Provider test</div>
      <CodeBlock
        code={JSON.stringify({ activeTabGroup }, null, 2)}
        theme="light"
      />
      {['hcl', 'json', 'cli', 'javascript', 'go'].map((lang) => {
        return (
          <button key={lang} onClick={() => setActiveTabGroup(lang)}>
            Set {lang}
          </button>
        )
      })}
    </div>
  )
}

export default TabProviderTest
