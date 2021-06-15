module.exports = {
  '*.+(css|js|jsx|ts|tsx|md|mdx|yml|yaml|json|html|graphql)': (filenames) => {
    return [
      `next-hashicorp format ${filenames.join(' ')}`,
      `next-hashicorp lint ${filenames.join(' ')}`,
    ]
  },
}
