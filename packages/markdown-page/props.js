module.exports = {
  components: {
    type: 'object',
    description:
      'An object in which the key is the name of a react component, and the value is the actual component. Identical objects should be passed to `generateStaticProps` and `<MarkdownPage />` if used.',
  },
  staticProps: {
    required: true,
    type: 'object',
    description:
      'the return value from the `generateStaticProps` function from `@hashicorp/react-markdown-page/server`. See docs for details.',
  },
}
