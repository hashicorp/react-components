## Editing Markdown Content

Documentation content is written in [Markdown](https://www.markdownguide.org/cheat-sheet/) and you'll find all files listed under the `/content` directory.

To create a new page with Markdown, create a file ending in `.mdx` in a `content/<subdirectory>`. The path in the content directory will be the URL route. For example, `content/docs/hello.mdx` will be served from the `/docs/hello` URL.

> **Important**: Files and directories will only be rendered and published to the website if they are [included in sidebar data](#editing-navigation-sidebars). Any file not included in sidebar data will not be rendered or published.

This file can be standard Markdown and also supports [YAML frontmatter](https://middlemanapp.com/basics/frontmatter/). YAML frontmatter is optional, there are defaults for all keys.

```yaml
---
title: 'My Title'
description: "A thorough, yet succinct description of the page's contents"
---

```

The significant keys in the YAML frontmatter are:

- `title` `(string)` - This is the title of the page that will be set in the HTML title.
- `description` `(string)` - This is a description of the page that will be set in the HTML description.

> ⚠️ If there is a need for a `/api/*` url on this website, the url will be changed to `/api-docs/*`, as the `api` folder is reserved by next.js.

### Creating New Pages

There is currently a small bug with new page creation - if you create a new page and link it up via subnav data while the server is running, it will report an error saying the page was not found. This can be resolved by restarting the server.

### Markdown Enhancements

There are several custom markdown plugins that are available by default that enhance [standard markdown](https://commonmark.org/) to fit our use cases. This set of plugins introduces a couple instances of custom syntax, and a couple specific pitfalls that are not present by default with markdown, detailed below:

- If you see the symbols `~>`, `->`, `=>`, or `!>`, these represent [custom alerts](https://github.com/hashicorp/remark-plugins/tree/master/plugins/paragraph-custom-alerts#paragraph-custom-alerts). These render as colored boxes to draw the user's attention to some type of aside.
- If you see `@include '/some/path.mdx'`, this is a [markdown include](https://github.com/hashicorp/remark-plugins/tree/master/plugins/include-markdown#include-markdown-plugin). It's worth noting as well that all includes resolve from `website/content/partials` by default, and that changes to partials will not live-reload the website.
- If you see `# Headline ((#slug))`, this is an example of an [anchor link alias](https://github.com/hashicorp/remark-plugins/tree/je.anchor-link-adjustments/plugins/anchor-links#anchor-link-aliases). It adds an extra permalink to a headline for compatibility and is removed from the output.
- Due to [automatically generated permalinks](https://github.com/hashicorp/remark-plugins/tree/je.anchor-link-adjustments/plugins/anchor-links#anchor-links), any text changes to _headlines_ or _list items that begin with inline code_ can and will break existing permalinks. Be very cautious when changing either of these two text items.

  Headlines are fairly self-explanatory, but here's an example of how to list items that begin with inline code look.

  ```markdown
  - this is a normal list item
  - `this` is a list item that begins with inline code
  ```

  Its worth noting that _only the inline code at the beginning of the list item_ will cause problems if changed. So if you changed the above markup to...

  ```markdown
  - lsdhfhksdjf
  - `this` jsdhfkdsjhkdsfjh
  ```

  ...while it perhaps would not be an improved user experience, no links would break because of it. The best approach is to **avoid changing headlines and inline code at the start of a list item**. If you must change one of these items, make sure to tag someone from the digital marketing development team on your pull request, they will help to ensure as much compatibility as possible.

### Custom Components

A number of custom [mdx components](https://mdxjs.com/) are available for use within any `.mdx` file. Each one is documented below:

#### Tabs

The `Tabs` component creates tabbed content of any type, but is often used for code examples given in different languages. Here's an example of how it looks from the Vagrant documentation website:

![Tabs Component](https://p176.p0.n0.cdn.getcloudapp.com/items/WnubALZ4/Screen%20Recording%202020-06-11%20at%2006.03%20PM.gif?v=1de81ea720a8cc8ade83ca64fb0b9edd)

> Please refer to the [Swingset](https://react-components.vercel.app/?component=Tabs) documention for the latest examples and API reference.

It can be used as such within a markdown file:

````mdx
Normal **markdown** content.

<Tabs>
<Tab heading="CLI command">
            <!-- Intentionally skipped line.. -->
```shell-session
$ command ...
```
            <!-- Intentionally skipped line.. -->
</Tab>
<Tab heading="API call using cURL">

```shell-session
$ curl ...
```

</Tab>
</Tabs>

Continued normal markdown content
````

The intentionally skipped line is a limitation of the mdx parser which is being actively worked on. All tabs must have a heading, and there is no limit to the number of tabs, though it is recommended to go for a maximum of three or four.

#### Enterprise Alert

This component provides a standard way to call out functionality as being present only in the enterprise version of the software. It can be presented in two contexts, inline or standalone. Here's an example of standalone usage from the Consul docs website:

![Enterprise Alert Component - Standalone](https://p176.p0.n0.cdn.getcloudapp.com/items/WnubALp8/Screen%20Shot%202020-06-11%20at%206.06.03%20PM.png?v=d1505b90bdcbde6ed664831a885ea5fb)

The standalone component can be used as such in markdown files:

```mdx
# Page Headline

<EnterpriseAlert />

Continued markdown content...
```

It can also receive custom text contents if you need to change the messaging but wish to retain the style. This will replace the text `This feature is available in all versions of Consul Enterprise.` with whatever you add. For example:

```mdx
# Page Headline

<EnterpriseAlert>
  My custom text here, and <a href="#">a link</a>!
</EnterpriseAlert>

Continued markdown content...
```

It's important to note that once you are adding custom content, it must be html and can not be markdown, as demonstrated above with the link.

Now let's look at inline usage, here's an example:

![Enterprise Alert Component - Inline](https://p176.p0.n0.cdn.getcloudapp.com/items/L1upYLEJ/Screen%20Shot%202020-06-11%20at%206.07.50%20PM.png?v=013ba439263de8292befbc851d31dd78)

And here's how it could be used in your markdown document:

```mdx
### Some Enterprise Feature <EnterpriseAlert inline />

Continued markdown content...
```

It's also worth noting that this component will automatically adjust to the correct product colors depending on the context.

#### Other Components

Other custom components can be made available on a per-site basis, the above are the standards. If you have questions about custom components that are not documented here, or have a request for a new custom component, please reach out to @hashicorp/digital-marketing.

### Syntax Highlighting

When using fenced code blocks, the recommendation is to tag the code block with a language so that it can be syntax highlighted. For example:

````
```
// BAD: Code block with no language tag
```

```javascript
// GOOD: Code block with a language tag
```
````

Check out the [supported languages list](https://prismjs.com/#supported-languages) for the syntax highlighter we use if you want to double check the language name.

It is also worth noting specifically that if you are using a code block that is an example of a terminal command, the correct language tag is `shell-session`. For example:

🚫**BAD**: Using `shell`, `sh`, `bash`, or `plaintext` to represent a terminal command

````
```shell
$ terraform apply
```
````

✅**GOOD**: Using `shell-session` to represent a terminal command

````
```shell-session
$ terraform apply
```
````
