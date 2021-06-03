import React, { Children } from 'react'
import classNames from 'classnames'
import { getCanonicalSlug, getLanguageName } from '../../utils/prism-utils'
import useIndexedTabs from '../../provider/use-indexed-tabs'
import TabsAsDropdown from './partials/tabs-as-dropdown'
import TabsAsTabs from './partials/tabs-as-tabs'
import OverflowDetector from './partials/overflow-detector'
import themeDark from '../../theme-dark.module.css'
import themeLight from '../../theme-light.module.css'
import s from './style.module.css'

function CodeTabs({ children, heading, className, tabs, theme = 'dark' }) {
  /* @TODO - throw error if any children are invalid,
  they must be either <pre>, <CodeBlock>, or <CodeBlockConfig/>.
  Need to account for both MDX and JSX contexts */
  const validChildren = Children.toArray(children)
  // Throw an error if the tabs prop is defined, but does no
  // match the number of valid children
  if (tabs !== undefined && tabs.length !== validChildren.length) {
    throw new Error(
      `In CodeTabs, the tabs array length must match the number of children. Found mismatched tabs length ${tabs.length} and children length ${validChildren.length}. Please adjust the tabs prop or the number of children to resolve this issue.`
    )
  }
  // Parse tab labels and groupIds, using data from the tabs prop
  // where available, or falling back to generating labels and group IDs
  const parsedTabs = resolveTabData(validChildren, tabs)
  // Use index-to-group syncing utility
  const tabGroupIds = parsedTabs.map((t) => t.group)
  const [activeTabIdx, setActiveTabIdx] = useIndexedTabs(tabGroupIds, 0)
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
                  setActiveTabIdx={setActiveTabIdx}
                />
              ) : (
                <TabsAsTabs
                  tabLabels={tabLabels}
                  activeTabIdx={activeTabIdx}
                  setActiveTabIdx={setActiveTabIdx}
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
            isNested: true,
            theme, // ensures theme of child code blocks in JSX matches tabs theme
          })
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              className={classNames(s.tabChildWrapper, {
                [s.isActive]: isActive,
              })}
              data-is-active={isActive}
            >
              {clonedChild}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * TODO break the below into a util function file
 * and write some basic unit tests to help
 * clarify intent
 * @param {*} validChildren
 * @param {*} tabs
 * @returns
 */
function resolveTabData(validChildren, tabs) {
  /* @TODO - Throw an error if tab labels cannot be parsed */
  return validChildren.map(parseTabDataFromChild).map((parsedTab, idx) => {
    const hasTabsProp = typeof tabs !== 'undefined'
    const tabFromProps =
      hasTabsProp && typeof tabs[idx] === 'string'
        ? { label: tabs[idx] }
        : hasTabsProp && typeof tabs[idx] === 'object'
        ? tabs[idx]
        : {}
    return { ...parsedTab, ...tabFromProps }
  })
}

function parseTabDataFromChild(tabChild) {
  const { mdxType, ...restProps } = tabChild.props
  const languageClass =
    mdxType === 'pre'
      ? // For fenced children, derive the language
        // from the language-* className
        restProps.className
      : mdxType == 'CodeBlockConfig'
      ? // For CodeBlockConfig children, derive the language
        // from the language-* className which is
        // located on the nested fenced code block
        restProps.children.props.className
      : // For other contexts, assume JSX, and assume CodeBlock children
        // which should have a language prop set directly
        `language-${restProps.language}`
  const slugFromClass = languageClass.split('-')[1]
  const languageSlug = getCanonicalSlug(slugFromClass) || slugFromClass
  return {
    group: languageSlug,
    label: getLanguageName(languageSlug) || titleCase(languageSlug),
  }
}

function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()
}

export default CodeTabs
