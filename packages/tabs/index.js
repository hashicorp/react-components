import { useState, useEffect, Children } from 'react'
import TabTriggers from './partials/TabTriggers/index.js'
import TabProvider, { useTabGroups } from './provider'

function Tabs({ defaultTabIdx, centered, fullWidthBorder, theme, children }) {
  if (!children) return null

  children = !Array.isArray(children) ? Children.toArray(children) : children

  const isDefaultOutOfBounds =
    defaultTabIdx >= children.length || defaultTabIdx < 0

  const [activeTabIdx, setActiveTabIdx] = useState(
    // if specified default is out of bounds (ie, it's determined at runtime),
    // fallback to 0 to avoid throwing an error
    isDefaultOutOfBounds ? 0 : defaultTabIdx
  )
  const groupCtx = useTabGroups()

  function setActiveTab(targetIdx, groupId) {
    setActiveTabIdx(targetIdx)
    if (groupCtx) groupCtx.setActiveTabGroup(groupId)
  }

  useEffect(() => {
    const hasGroups = children.filter((tab) => tab.props.group).length > 0
    if (
      process.env.NODE_ENV !== 'production' &&
      hasGroups &&
      groupCtx === undefined
    ) {
      console.warn(
        'The `TabProvider` cannot be accessed. Make sure it wraps the `Tabs` components so Tab Groups can work properly.'
      )
    }
  }, [])

  return (
    <section
      className={`g-tabs ${theme}${centered ? ' g-tabs-centered' : ''}${
        fullWidthBorder ? ' g-tabs-full-border' : ''
      }`}
    >
      <TabTriggers
        items={children.map((tab, idx) => {
          const { heading, group, tooltip } = tab.props
          return {
            tabIndex: idx,
            heading,
            group,
            tooltip,
          }
        })}
        activeTabIdx={activeTabIdx}
        setActiveTab={setActiveTab}
      />
      <div className="g-grid-container">
        {children[activeTabIdx].props.children}
      </div>
    </section>
  )
}

Tabs.defaultProps = {
  defaultTabIdx: 0,
  theme: '',
}

function Tab({ children }) {
  return <>{children}</>
}

export default Tabs
export { TabProvider, useTabGroups, Tab }
