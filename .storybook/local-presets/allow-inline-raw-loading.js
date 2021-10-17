const fileLoaderRegex = /\.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/

module.exports = {
  webpackFinal(config = {}, options = {}) {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test.toString() === fileLoaderRegex.toString()
    )

    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules.filter(
            (rule) => rule.test.toString() !== fileLoaderRegex.toString()
          ),
          {
            // Use `raw-loader` for files with an ?include resourceQuery
            test: fileLoaderRule.test,
            oneOf: [
              {
                test: /\.svg$/,
                resourceQuery: /include/,
                use: 'raw-loader',
              },
              fileLoaderRule,
            ],
          },
        ],
      },
    }
  },
}
