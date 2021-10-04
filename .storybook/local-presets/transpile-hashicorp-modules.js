const defaultRuleRegex = /\.(mjs|tsx?|jsx?)$/

const transpileList = [
  '@hashicorp/platform-product-meta',
  '@hashicorp/platform-util',
  '@hashicorp/react-inline-svg',
  '@hashicorp/react-button',
  '@hashicorp/react-toggle',
  '@hashicorp/react-image',
  '@hashicorp/react-link-wrap',
]

module.exports = {
  webpackFinal(config = {}, options = {}) {
    const defaultRule = config.module.rules.find(
      (rule) => rule.test.toString() === defaultRuleRegex.toString()
    )

    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules.filter(
            (rule) => rule.test.toString() !== defaultRuleRegex
          ),
          {
            // Transpile HashiCorp modules by
            // overriding default simple exclusion of node_modules
            ...defaultRule,
            exclude: new RegExp(
              `node_modules${transpileList.map((p) => `(?!/${p})`).join('')}`
            ),
          },
        ],
      },
    }
  },
}
