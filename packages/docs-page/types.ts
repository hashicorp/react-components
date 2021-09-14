interface Node {
  /**
   * @example
   * ```tsx
   * const title = "AliCloud With A Very Long NavLeaf Title That Should Wrap To Multiple Lines"
   * const title = <code>GCP</code>
   * ```
   */
  title: string | React.ReactNode
  hidden?: boolean
}

interface NavItem extends Node {
  /** @example `"agent/autoauth/methods/alicloud"` */
  path: string
}
interface ExternalItem extends Node {
  /**
   * An external link, or an internal direct link
   * @example `"https://google.com"`, `"/components/docssidenav"`
   */
  href: string
}

interface Divider {
  divider: true
}

interface NavTree extends Node {
  routes: (NavItem | ExternalItem | NavTree | Divider)[]
}

export interface NavData {
  title: string
  path: string
  routes: NavTree
}
