import React, { Children } from 'react'
import type { ReactElement } from 'react'
import classNames from 'classnames'
import resolveTabData from '../../utils/resolve-tab-data'
import useIndexedTabs from '../../provider/use-indexed-tabs'
import TabsAsDropdown from './partials/tabs-as-dropdown'
import TabsAsTabs from './partials/tabs-as-tabs'
import CodeBlock from '../../'
import CodeBlockConfig from '../code-block-config'
import OverflowDetector from './partials/overflow-detector'
import themeDark from '../../theme-dark.module.css'
import themeLight from '../../theme-light.module.css'
import s from './style.module.css'
import analytics from '../../analytics'

export interface CodeTabsProps {
  children?: ReactElement[]
  heading?: string
  className?: string
  tabs: (string | { group: string; label: string })[]
  theme?: 'light' | 'dark'
}

function CodeTabs({
  children,
  heading,
  className,
  tabs,
  theme = 'dark',
}: CodeTabsProps) {
  const validChildren = Children.toArray(children) as ReactElement[]
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
    // For JSX primitives, the type is captured by the type property
    if (
      typeof tabChild.type === 'string' ||
      typeof tabChild.type === 'number'
    ) {
      type = tabChild.type
      // For function components, accept CodeBlock or CodeBlockConfig.
    } else if (typeof tabChild.type === 'function') {
      // Note that function names may be minified, we repeat them here
      // so that error messages are more helpful.
      const validComponents = [
        { component: CodeBlock, name: 'CodeBlock' },
        { component: CodeBlockConfig, name: 'CodeBlockConfig' },
      ]
      const matchIdx = validComponents
        .map((c) => c.component)
        // we use `never` here instead of `any` to signify that we don't care
        // about the type
        .indexOf(tabChild.type as never)
      if (matchIdx >= 0) {
        type = validComponents[matchIdx].name
      } else {
        type = 'Unrecognized component'
      }
    }
    // In MDX contexts, the component type is captured in mdxType,
    // and this should override any previously derived type.
    if (typeof tabChild.props?.mdxType === 'string') {
      type = tabChild.props.mdxType
    }
    return type
  })
  const validTypes = [
    'CodeBlock',
    'CodeBlockConfig',
    'pre',
    'themedCodeBlockConfig',
    'themedPre',
  ]
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
  function setActiveTabWithEvent(tabIdx: number) {
    analytics.trackTabSelect(tabGroupIds[tabIdx])
    setActiveTabIdx(tabIdx)
  }

  // gather labels
  const tabLabels = parsedTabs.map((t) => t.label)

  // if we have a heading, we align tabs right (and make some style tweaks)
  const hasHeading = Boolean(heading)

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
              {hasHeading ? (
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
                  hasHeading={hasHeading}
                />
              ) : (
                <TabsAsTabs
                  tabLabels={tabLabels}
                  activeTabIdx={activeTabIdx}
                  setActiveTabIdx={setActiveTabWithEvent}
                  hasHeading={hasHeading}
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
