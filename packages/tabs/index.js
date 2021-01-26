import { useState } from 'react'
import TabTriggers from './partials/TabTriggers/index.js'
import TabProvider, { useTabPaths } from './provider'

function Tabs({ items, defaultTabIdx, centered, fullWidthBorder, theme }) {
  const isDefaultOutOfBounds =
    defaultTabIdx >= items.length || defaultTabIdx < 0

  const [activeTabIdx, setActiveTabIdx] = useState(
    // if specified default is out of bounds (ie, it's determined at runtime),
    // fallback to 0 to avoid throwing an error
    isDefaultOutOfBounds ? 0 : defaultTabIdx
  )

  let ctx
  // need to catch if this hook isn't called within context
  try {
    ctx = useTabPaths()
  } catch (e) {
    console.warn(
      'The `TabProvider` cannot be accessed. Make sure it is added if needing to use Tab Paths.',
      { e }
    )
  }

  return (
    <section
      className={`g-tabs ${theme}${centered ? ' g-tabs-centered' : ''}${
        fullWidthBorder ? ' g-tabs-full-border' : ''
      }`}
    >
      <TabTriggers
        items={items.map((item, idx) => ({
          tabIndex: idx,
          heading: item.heading,
          tabPathId: item.tabPathId,
          ...(item.tooltip && { tooltip: item.tooltip }),
        }))}
        activeTabPath={ctx?.activeTabPath}
        setActiveTabPath={ctx?.setActiveTabPath}
        activeTabIdx={activeTabIdx}
        setActiveTabIdx={setActiveTabIdx}
      />
      <div className="g-grid-container">
        {items[activeTabIdx].tabChildren()}
      </div>
    </section>
  )
}

Tabs.defaultProps = {
  defaultTabIdx: 0,
  theme: '',
}

export default Tabs
export { TabProvider, useTabPaths }
