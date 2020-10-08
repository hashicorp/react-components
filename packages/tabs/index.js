import { useState } from 'react'
import TabTriggers from './partials/TabTriggers/index.js'

function Tabs({ items, defaultTabIdx, centered, fullWidthBorder, theme }) {
  const isDefaultOutOfBounds =
    defaultTabIdx >= items.length || defaultTabIdx < 0

  const [activeTabIdx, setActiveTabIdx] = useState(
    // if specified default is out of bounds (ie, it's determined at runtime),
    // fallback to 0 to avoid throwing an error
    isDefaultOutOfBounds ? 0 : defaultTabIdx
  )

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
          ...(item.tooltip && { tooltip: item.tooltip }),
        }))}
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
