module.exports = {
  href: {
    type: 'string',
    description: 'Path to an internal or external route.',
    required: true,
  },
  Link: {
    type: 'React.Element',
    description:
      'NextJS `Link` Component (https://nextjs.org/docs/api-reference/next/link), only required for client-side routing.',
  },
  as: {
    type: 'string',
    description:
      'Path rendered in the browser URL bar, used for dynamic routes.',
  },
  passHref: {
    type: 'boolean',
    description: 'Whether `Link` passes its `href` prop to the `a`',
    default: false,
  },
  prefetch: {
    type: 'boolean',
    description: 'Whether to prefetch the page in the background',
    default: true,
  },
  replace: {
    type: 'boolean',
    description:
      'Whether to replace the current `history` state instead of adding a new URL into the stack',
    default: false,
  },
  scroll: {
    type: 'boolean',
    description:
      'Whether to force the window scroll and focus to reset after navigation',
    default: false,
  },
  shallow: {
    type: 'boolean',
    description: 'Whether to change the URL without running `getInitialProps`',
    default: false,
  },
}
