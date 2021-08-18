module.exports = {
  webpackFinal(config = {}, options = {}) {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.graphql$/,
            use: 'raw-loader',
          },
        ],
      },
    }
  },
}
