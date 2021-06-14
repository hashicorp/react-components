import unified, { Pluggable } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import markdownDefaults, { ContentPluginsOptions } from '../index'

/**
 * Transforms a string of markdown into a string of HTML
 *
 * @param {string} markdown - A string of markdown
 * @param {object} [options] - Configuration options. Omit this argument to use remark & rehype without any plugins.
 * @param {(boolean|Object)} [options.contentPlugins] - Configure content plugins. Pass "true" to use our default content plugin set. Pass an object to use our default set with custom configuration. Supports all configuration options for remark and rehype plugins available in `@hashicorp/nextjs-scripts/markdown`.
 *
 */
export default async function markdownToHtml(
  markdown: string,
  { contentPlugins }: { contentPlugins?: ContentPluginsOptions | boolean } = {}
): Promise<string> {
  //  Parse the consumer's desired remark and rehype plugins
  let remarkPlugins: Pluggable[] = []
  let rehypePlugins: Pluggable[] = []
  //  Use content plugins from our configurable default set
  if (contentPlugins) {
    const configOptions = contentPlugins === true ? {} : contentPlugins
    const configuredDefaults = markdownDefaults(configOptions)
    remarkPlugins = configuredDefaults.remarkPlugins
    rehypePlugins = configuredDefaults.rehypePlugins
  }
  //  Configure a unified processor
  const processor = unified()
  //  Parse markdown to an [`mdast`](https://github.com/syntax-tree/mdast) syntax tree
  processor.use(remarkParse)
  //  Use the specified "remark plugins"
  //  * Note that "remark plugins" are just unified "attachers" that
  //  * transform [`mdast`](https://github.com/syntax-tree/mdast) syntax trees
  remarkPlugins.forEach((entry) => {
    const [plugin, options] = Array.isArray(entry) ? entry : [entry, undefined]
    if (typeof plugin === 'function') {
      processor.use(plugin, options)
    } else {
      processor.use(plugin)
    }
  })
  //  Parse the [`mdast`](https://github.com/syntax-tree/mdast) syntax tree
  //  into a [`hast`](https://github.com/syntax-tree/hast) syntax tree
  //  Note: we need allowDangerousHtml so that we can process `html` type nodes,
  //  which our `anchor-links` plugin produces. Ref:
  //  https://github.com/hashicorp/remark-plugins/blob/master/plugins/anchor-links/index.js#L68
  processor.use(remarkRehype, { allowDangerousHtml: true })
  //  Use the specified "rehype plugins"
  //  * Note that "rehype plugins" are just unified "attachers" that
  //  * transform [`hast`](https://github.com/syntax-tree/hast) syntax trees
  rehypePlugins.forEach((entry) => {
    const [plugin, options] = Array.isArray(entry) ? entry : [entry, undefined]
    if (typeof plugin === 'function') {
      processor.use(plugin, options)
    } else {
      processor.use(plugin)
    }
  })
  //  Transform the [`hast`](https://github.com/syntax-tree/hast) syntax tree
  //  into a string of HTML with rehype-stringify
  //  Note: we need allowDangerousHtml so that we can stringify `html` type nodes,
  //  which our `anchor-links` plugin produces. Ref:
  //  https://github.com/hashicorp/remark-plugins/blob/master/plugins/anchor-links/index.js#L68
  processor.use(rehypeStringify, { allowDangerousHtml: true })
  //  Use our configured processor to get from markdown to HTML
  const htmlOutput = String(await processor.process(markdown))
  return htmlOutput
}
