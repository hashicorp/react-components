## Redirects

This website structures URLs based on the filesystem layout. This means that if a file is moved, removed, or a folder is re-organized, links will break. If a path change is necessary, it can be mitigated using redirects. It's important to note that redirects should only be used to cover for external links -- if you are moving a path which internal links point to, the internal links should also be adjusted to point to the correct page, rather than relying on a redirect.

To add a redirect, head over to the `redirects.js` file - the format is fairly simple - there's a `source` and a `destination` - fill them both in, indicate that it's a permanent redirect or not using the `permanent` key, and that's it. Let's look at an example:

```
{
  source: '/foo',
  destination: '/bar',
  permanent: true
}
```

This redirect rule will send all incoming links to `/foo` to `/bar`. For more details on the redirects file format, [check out the docs on vercel](https://vercel.com/docs/configuration#project/redirects). All redirects will work both locally and in production exactly the same way, so feel free to test and verify your redirects locally. In the past testing redirects has required a preview deployment -- this is no longer the case. Please note however that if you add a redirect while the local server is running, you will need to restart it in order to see the effects of the redirect.

There is still one caveat though: redirects do not apply to client-side navigation. By default, all links in the navigation and docs sidebar will navigate purely on the client side, which makes navigation through the docs significantly faster, especially for those with low-end devices and/or weak internet connections. In the future, we plan to convert all internal links within docs pages to behave this way as well. This means that if there is a link on this website to a given piece of content that has changed locations in some way, we need to also _directly change existing links to the content_. This way, if a user clicks a link that navigates on the client side, or if they hit the url directly and the page renders from the server side, either one will work perfectly.

Let's look at an example. Say you have a page called `/docs/foo` which needs to be moved to `/docs/nested/foo`. Additionally, this is a page that has been around for a while and we know there are links into `/docs/foo.html` left over from our previous website structure. First, we move the page, then adjust the docs sidenav, in `data/docs-navigation.js`. Find the category the page is in, and move it into the appropriate subcategory. Next, we add to `_redirects` as such. The `.html` version is covered automatically.

```js
{ source: '/foo', destination: '/nested/foo', permanent: true }
```

Next, we run a global search for internal links to `/foo`, and make sure to adjust them to be `/nested/foo` - this is to ensure that client-side navigation still works correctly. _Adding a redirect alone is not enough_.

One more example - let's say that content is being moved to an external website. A common example is guides moving to `learn.hashicorp.com`. In this case, we take all the same steps, except that we need to make a different type of change to the `docs-navigation` file. If previously the structure looked like:

```js
{
  category: 'docs',
  content: [
    'foo'
  ]
}
```

If we no longer want the link to be in the side nav, we can simply remove it. If we do still want the link in the side nav, but pointing to an external destination, we need to slightly change the structure as such:

```js
{
  category: 'docs',
  content: [
    { title: 'Foo Title', href: 'https://learn.hashicorp.com/<product>/foo' }
  ]
}
```

As the majority of items in the side nav are internal links, the structure makes it as easy as possible to represent these links. This alternate syntax is the most concise manner than an external link can be represented. External links can be used anywhere within the docs sidenav.

It's also worth noting that it is possible to do glob-based redirects, for example matching `/docs/*`, and you may see this pattern in the redirects file. This type of redirect is much higher risk and the behavior is a bit more nuanced, so if you need to add a glob redirect, please reach out to the website maintainers and ask about it first.
