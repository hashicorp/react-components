import { getCanonicalSlug, getLanguageName } from './prism-utils'

/**
 * Given an array of react children,
 * and the tabs prop as passed to CodeTabs
 * (which may be undefined),
 * Return default values for tab labels and
 * groups based on child code block languages,
 * but allow these to be individually overridden by the
 * values in the `tabs` prop array if present.
 *
 * @param {array} validChildren Array of React children, all of which must be one of CodeBlock, CodeBlockConfig, or pre elements
 * @param {array} tabs Optional array of strings, to set tab "labels" only, or of { label, group } objects
 * @returns
 */
function resolveTabData(validChildren, tabs) {
  // Generate fallback data for all child tabs
  const fallbackData = validChildren.map(parseTabDataFromChild)
  // Allow data from the tabs prop to override fallback data
  return fallbackData.map((fallbackValues, idx) => {
    const hasTabsProp = typeof tabs !== 'undefined'
    if (!hasTabsProp) return fallbackValues
    const valuesFromProps =
      typeof tabs[idx] === 'string'
        ? { label: tabs[idx] }
        : typeof tabs[idx] === 'object'
        ? tabs[idx]
        : {}
    return { ...fallbackValues, ...valuesFromProps }
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

export default resolveTabData
