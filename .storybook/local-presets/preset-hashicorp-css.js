const path = require('path')
const withHashiCorpCss = require('@hashicorp/platform-nextjs-plugin/dist/plugins/with-css')
  .default
const cssRegex = '/\\.css$/'
const cssModuleRegex = /\.module\.css$/

// We define a custom Storybook Preset to handle loading of `.css` and `.module.css` files to mirror our CSS config for sites
module.exports = {
  webpackFinal(config = {}, options = {}) {
    const cssRule = config.module.rules.find(
      (rule) => rule.test.toString() === cssRegex
    )

    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules.filter(
            (rule) => rule.test.toString() !== cssRegex
          ),
          {
            // Target .css files
            ...cssRule,
            exclude: cssModuleRegex,
            use: cssRule.use.map((u) => {
              // Use our shared PostCSS options from `@hashicorp/nextjs-scripts`
              if (u.options && typeof u.options.postcssOptions == 'object') {
                u.options = getCssLoaderOptions()
              }
              return u
            }),
          },
          {
            ...cssRule,
            test: /\.module\.css$/,
            use: cssRule.use.map((_) => {
              if (_ && _.loader && _.loader.match(/[\/\\]css-loader/g)) {
                return {
                  ..._,
                  options: {
                    ..._.options,
                    modules: {
                      localIdentName: '[name]__[local]__[hash:base64:5]',
                    },
                  },
                }
              }

              return _
            }),
          },
        ],
      },
    }
  },
}

/**
 *
 * Given our `withCss` plugin from @hashicorp/nextjs-scripts,
 * and the project root dir
 * return a webpack CSS loader configured as it would be if we were using `@hashicorp/nextjs-scripts`
 */
function getCssLoaderOptions() {
  //  Root dir needs to be passed, so that
  //  `{projectRootDir}/node_modules/@hashicorp/mktg-global-styles` can be accessed
  const projectRootDir = path.resolve(path.join(__dirname, '../../'))
  //  Set up a scaffold webpack config, with an unconfigured `postcss-loader`
  const scaffold = {
    name: 'client',
    module: {
      rules: [
        {
          test: /(?<!\.module)\.css$/,
          use: [
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                postcssOptions: {},
              },
            },
          ],
        },
      ],
    },
  }
  //  Run `withHashiCorpCss` to fill the scaffold with our shared `postcss` config
  const configured = withHashiCorpCss({})().webpack(scaffold, {
    dir: projectRootDir,
  })
  //  We made the scaffold, so we know the CSS loader is the first rule
  const hashiCssLoader = configured.module.rules[0]
  //  We just need the options, not the full loader
  return hashiCssLoader.use[0].options
}
