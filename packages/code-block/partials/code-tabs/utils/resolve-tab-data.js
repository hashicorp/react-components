import { getCanonicalSlug, getLanguageName } from '../../../utils/prism-utils'

/**
 * @param {*} validChildren
 * @param {*} tabs
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
