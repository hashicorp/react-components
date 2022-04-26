// NavData is an array of NavNodes
export type NavData = NavNode[]

// A NavNode can be any of these types
export type NavNode =
  | NavLeaf
  | NavDirectLink
  | NavDivider
  | NavHeading
  | NavBranch

// A NavLeaf represents a page with content.
//
// The "path" refers to the URL route from the content subpath.
// For all current docs sites, this "path" also
// corresponds to the content location in the filesystem.
//
// Note that "path" can refer to either "named" or "index" files.
// For example, we will automatically resolve the path
// "commands" to either "commands.mdx" or "commands/index.mdx".
// If both exist, we will throw an error to alert authors
// to the ambiguity.
interface NavLeaf {
  title: string
  path: string
}

// A NavDirectLink allows linking outside the content subpath.
//
// This includes links on the same domain,
// for example, where the content subpath is `/docs`,
// one can create a direct link with href `/use-cases`.
//
// This also allows for linking to external URLs,
// for example, one could link to `https://hashiconf.com/`.
interface NavDirectLink {
  title: string
  href: string
}

// A NavDivider represents a divider line
interface NavDivider {
  divider: true
}

interface NavHeading {
  heading: string
}

// A NavBranch represents nested navigation data.
interface NavBranch {
  title: string
  routes: NavNode[]
}

/**
 * When `__isActive: true`, the the nav node
 * should be highlighted in the UI.
 *
 * When `__isFiltered: true`, this signifies that a
 * filter user input is present and that the nav node
 * **should be** displayed in the UI.
 *
 * We have an optional `hidden: boolean` property that can be
 * manually added to hide nav items from the sidebar.
 */
export type NavNodeWithInjectedFields = NavNode & {
  __isActive?: boolean
  __isFiltered?: boolean
  hidden?: boolean
}
