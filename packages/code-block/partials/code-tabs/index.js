import React, { Children } from 'react'
import classNames from 'classnames'
import resolveTabData from '../../utils/resolve-tab-data'
import useIndexedTabs from '../../provider/use-indexed-tabs'
import TabsAsDropdown from './partials/tabs-as-dropdown'
import TabsAsTabs from './partials/tabs-as-tabs'
import OverflowDetector from './partials/overflow-detector'
import themeDark from '../../theme-dark.module.css'
import themeLight from '../../theme-light.module.css'
import s from './style.module.css'
import analytics from '../../analytics'

function CodeTabs({ children, heading, className, tabs, theme = 'dark' }) {
  const validChildren = Children.toArray(children)
  // Throw an error if the tabs prop is defined, but does not
  // match the number of valid children
  if (tabs !== undefined && tabs.length !== validChildren.length) {
    throw new Error(
      `In CodeTabs, the tabs array length must match the number of children. Found mismatched tabs length ${tabs.length} and children length ${validChildren.length}. Please adjust the tabs prop or the number of children to resolve this issue.`
    )
  }
  // Throw an error if any individual child has a type other than
  // the expected CodeBlock, CodeBlockConfig, or pre
  const childTypes = validChildren.map((tabChild) => {
    let type
    // For JSX primitives, the type of captured by the type property
    if (typeof tabChild.type == 'string') type = tabChild.type
    // For function components in JSX, ie CodeBlock and CodeBlockConfig,
    // tabChild.type is a function whose name we need
    if (typeof tabChild.type == 'function') type = tabChild.type.name
    // In MDX contexts, the component type is captured in mdxType
    if (typeof tabChild.props.mdxType === 'string')
      type = tabChild.props.mdxType
    return type
  })
  const validTypes = ['CodeBlock', 'CodeBlockConfig', 'pre']
  const unexpectedChildren = childTypes.filter((type) => {
    const isInvalidType = validTypes.indexOf(type) === -1
    return isInvalidType
  })
  if (unexpectedChildren.length) {
    throw new Error(
      `CodeTabs only accepts "CodeBlock", "CodeBlockConfig", or "pre" children. Found children with types: ${JSON.stringify(
        childTypes
      )}`
    )
  }
  // Parse tab labels and groupIds, using data from the tabs prop
  // where available, or falling back to generating labels and group IDs
  const parsedTabs = resolveTabData(validChildren, tabs)
  // Use index-to-group syncing utility
  const tabGroupIds = parsedTabs.map((t) => t.group)
  const [activeTabIdx, setActiveTabIdx] = useIndexedTabs(tabGroupIds)
  // Track CodeTab selection with window.analytics
  function setActiveTabWithEvent(tabIdx) {
    analytics.trackTabSelect(tabGroupIds[tabIdx])
    setActiveTabIdx(tabIdx)
  }

  // gather labels
  const tabLabels = parsedTabs.map((t) => t.label)

  return (
    <div
      className={classNames(
        className,
        s.root,
        theme == 'dark' ? themeDark.base : themeLight.base
      )}
    >
      <OverflowDetector
        render={({ hasOverflow }, overflowRef) => {
          return (
            <div ref={overflowRef} className={classNames(s.topBar)}>
              {heading ? (
                <div
                  className={classNames(s.heading, {
                    [s.hasOverflow]: hasOverflow,
                  })}
                >
                  {heading}
                </div>
              ) : null}
              {hasOverflow ? (
                <TabsAsDropdown
                  tabLabels={tabLabels}
                  activeTabIdx={activeTabIdx}
                  setActiveTabIdx={setActiveTabWithEvent}
                />
              ) : (
                <TabsAsTabs
                  tabLabels={tabLabels}
                  activeTabIdx={activeTabIdx}
                  setActiveTabIdx={setActiveTabWithEvent}
                />
              )}
            </div>
          )
        }}
      />
      <div>
        {validChildren.map((tabChild, idx) => {
          const isActive = idx == activeTabIdx
          const clonedChild = React.cloneElement(tabChild, {
            // Note: wipes any custom classNames on the tabChild.
            // This is intentional, for example, it removes
            // any margin set in MDX custom components
            className: s.tabChild,
            hasBarAbove: true, // removes margin, and top border rounding, for better UI fit
            theme, // ensures theme of child code blocks in JSX matches tabs theme
          })
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              // Inline display style allows visibility testing in Jest
              style={{ display: isActive ? 'block' : 'none' }}
            >
              {clonedChild}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CodeTabs
