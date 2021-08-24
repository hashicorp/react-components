import { useState, useEffect } from 'react'
import TabTriggers from './partials/TabTriggers/index.js'
import TabProvider, { useTabGroups } from './provider'
import s from './style.module.css'
function Tabs({
  className,
  defaultTabIdx,
  centered,
  fullWidthBorder,
  children,
  onChange,
}) {
  // Ensures a single child object converts to an array
  children = Array.prototype.concat(children)

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
    if (onChange) onChange(targetIdx, groupId)
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
        '@hashicorp/react-tabs: The `TabProvider` cannot be accessed. Make sure it wraps the `Tabs` components so Tab Groups can work properly.'
      )
    }
  }, [children, groupCtx])

  if (!children) {
    process.env.NODE_ENV !== 'production' &&
      console.warn(
        '@hashicorp/react-tabs: There are no `Tab` children for the `Tabs` component to render.'
      )
    return null
  }

  return (
    <section className={className}>
      <TabTriggers
        tabs={children.map((tab, index) => {
          const { heading, group, tooltip } = tab.props
          return {
            index,
            heading,
            group,
            tooltip,
          }
        })}
        centered={centered}
        fullWidthBorder={fullWidthBorder}
        activeTabIdx={activeTabIdx}
        setActiveTab={setActiveTab}
      />
      <div className={s.content}>{children[activeTabIdx].props.children}</div>
    </section>
  )
}

Tabs.defaultProps = {
  defaultTabIdx: 0,
}

function Tab({ children }) {
  return <>{children}</>
}

export default Tabs
export { TabProvider, useTabGroups, Tab }
