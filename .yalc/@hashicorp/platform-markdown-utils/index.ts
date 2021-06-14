import { allPlugins } from '@hashicorp/remark-plugins'
import highlight from '@mapbox/rehype-prism'
import { Pluggable } from 'unified'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

interface MarkdownDefaults {
  remarkPlugins: Pluggable[]
  rehypePlugins: Pluggable[]
}

export interface ContentPluginsOptions {
  // TODO: implement this once our @hashicorp/remark-plugins package is typed (https://app.asana.com/0/1100423001970639/1199650430485548)
  pluginOptions?: $TSFixMe
  addRemarkPlugins?: Pluggable[]
  addRehypePlugins?: Pluggable[]
  resolveIncludes?: string
  enableMath?: boolean
}

export default function markdownDefaults(
  options: ContentPluginsOptions = {}
): MarkdownDefaults {
  const res = {} as MarkdownDefaults

  // Set default remark/rehype plugins
  // Add user-provided remark plugins if present
  const remarkDefaults: Pluggable[] = allPlugins(options.pluginOptions)
  res.remarkPlugins = options.addRemarkPlugins
    ? [...remarkDefaults, ...options.addRemarkPlugins]
    : remarkDefaults

  const rehypeDefaults: Pluggable[] = [[highlight, { ignoreMissing: true }]]
  res.rehypePlugins = options.addRehypePlugins
    ? [...rehypeDefaults, ...options.addRehypePlugins]
    : rehypeDefaults

  // Convenience option to replace `{ pluginOptions: { includeMarkdown: { resolveFrom: '<PATH>' } } }`
  // with simply `{ resolveIncludes: '<PATH>' }`
  if (options.resolveIncludes) {
    res.remarkPlugins = res.remarkPlugins.map((entry) => {
      const [plugin, opts] = Array.isArray(entry) ? entry : [entry, undefined]
      if (
        typeof plugin === 'function' &&
        plugin.name === 'includeMarkdownPlugin'
      ) {
        return [plugin, { ...opts, resolveFrom: options.resolveIncludes }]
      } else {
        return entry
      }
    })
  }

  // Add math plugins if enabled
  if (options.enableMath) {
    res.remarkPlugins.push(remarkMath)
    res.rehypePlugins.push(rehypeKatex)
  }

  return res
}
