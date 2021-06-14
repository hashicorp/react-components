import s from './style.module.css'

import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import EnterpriseAlertBase from '@hashicorp/react-enterprise-alert'
import TabsBase, { Tab } from '@hashicorp/react-tabs'

// This function returns a simple object containing the default components
// The `additionalComponents` param is purely for convenience.
// It is intended for use with `next-mdx-remote`.
export default function defaultMdxComponents({
  product,
  additionalComponents = {},
}) {
  return Object.assign(_defaultComponents(product), additionalComponents)
}

// This function returns an MDXProvider that can be used when rendering
// within an mdx layout.
// It is intended for use with `next-mdx-enhanced`. Once we no longer use
// `next-mdx-enhanced` on any of our properties, it will be depreated.
export function createMdxProvider({ product, additionalComponents = {} }) {
  const allComponents = Object.assign(
    _defaultComponents(product),
    additionalComponents
  )

  return function CustomMDXProvider({ children }) {
    return <MDXProvider components={allComponents}>{children}</MDXProvider>
  }
}

// Purely for sharing between the two functions. Once `createMdxProvider` is
// deprecated, this can be moved inline.
function _defaultComponents(product) {
  return { Tabs, Tab, EnterpriseAlert: createEnterpriseAlert(product) }
}

//
// Base components need to be slightly modified to fit this context
//

// Enterprise alert gets the "product" prop defaulted
function createEnterpriseAlert(product) {
  return function EnterpriseAlert(props) {
    return <EnterpriseAlertBase product={product} {...props} />
  }
}

// Tabs is a general-purpose component that we format for ease of use within mdx
// It is also wrapped in a span with a css module class for styling overrides
export function Tabs({ defaultTabIdx, children }) {
  if (!Array.isArray(children))
    throw new Error('Multiple <Tab> elements required')

  return (
    <span className={s.tabsRoot}>
      <TabsBase defaultTabIdx={defaultTabIdx}>{children}</TabsBase>
    </span>
  )
}
