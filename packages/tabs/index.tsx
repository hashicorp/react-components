import React, { useState, useEffect } from 'react'
import TabTriggers from './partials/tab-triggers'
import TabProvider, { useTabGroups } from './provider'
import s from './style.module.css'
import classNames from 'classnames'
import themeStyle from './theme.module.css'

interface TabChildProps {
  /** Renders the tab contents. */
  children: React.ReactElement
  /** Plain text used for the tab heading. */
  heading: string
  /** Accepts a string such that, when the tab is active, other Tab elements outside the instance with a matching `group` value will automatically be shown. Note that `TabProvider` is required in order for this feature to function.v */
  group?: string
  /** Plain text displayed in a tooltip beside the tab heading. */
  tooltip?: string
}

function Tab({ children }: TabChildProps): React.ReactElement {
  return <>{children}</>
}

interface TabsProps {
  /** Children to be displayed as tabs. Each child accepts the props `{ children: ReactElement, heading: string, tooltip?: string, group?: string }` */
  children: Array<React.ReactElement<TabChildProps>>
  /** If set to true, the tabs are centered in their container. Default is left-aligned. */
  centered?: boolean
  /** Optional className to add to the root element. */
  className?: string
  /** Optional className to add to the tabs bar container. Useful for sticky positioning. */
  classNameTabBar?: string
  /** Set the default tab by its index. If not set, or if out of range, will default to the first tab, at index 0. */
  defaultTabIdx?: number
  /** If set to true, the bottom border underneath the tabs will fill the available width. Default border fills the constrained `.g-grid-container`. */
  fullWidthBorder?: boolean
  /** Optional callback which is executed when a new tab is selected. */
  onChange?: (targetTabIdx: number, targetTabGroup?: string) => void
  /** Visual theme, for alignment with surrounding components or user preference. */
  theme?: 'light' | 'dark'
}

function Tabs({
  children,
  className,
  classNameTabBar,
  defaultTabIdx = 0,
  centered = false,
  fullWidthBorder = false,
  theme = 'light',
  onChange,
}: TabsProps): React.ReactElement | null {
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
    <section className={classNames(className, themeStyle[theme])}>
      <TabTriggers
        className={classNameTabBar}
        tabs={children.map((tab, index) => {
          const { heading, group, tooltip } = tab.props
          return { index, heading, group, tooltip }
        })}
        centered={centered}
        fullWidthBorder={fullWidthBorder}
        activeTabIdx={activeTabIdx}
        setActiveTab={setActiveTab}
        theme={theme}
      />
      <div className={s.content}>{children[activeTabIdx].props.children}</div>
    </section>
  )
}

export default Tabs
export { TabProvider, useTabGroups, Tab }
