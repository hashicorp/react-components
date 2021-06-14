'use strict'
const postcssPresetEnv = require('postcss-preset-env')
const flexbugs = require('postcss-flexbugs-fixes')
const normalize = require('postcss-normalize')
const path = require('path')
module.exports = function withCss({
  afterPlugins = [],
  beforePlugins = [],
  presetEnvOptions = {},
} = {}) {
  return function withCssInternal(nextConfig = {}) {
    let hasAppliedModifications = false
    return Object.assign({}, nextConfig, {
      webpack(config, options) {
        const { dir } = options
        // this function tracks down the css loader block for global and css modules
        modifyLoaderConfig(
          config.module.rules,
          [/(?<!\.module)\.css$/, /\.module\.css$/],
          (rule) => {
            if (!Array.isArray(rule.use)) return
            rule.use.map((u) => {
              // now we grab the postcss loader configuration and apply our custom plugins
              if (typeof u.options.postcssOptions !== 'undefined') {
                hasAppliedModifications = true
                u.options.postcssOptions.plugins = [
                  ...beforePlugins,
                  flexbugs(),
                  postcssPresetEnv(
                    Object.assign(
                      {
                        stage: 3,
                        features: {
                          autoprefixer: { flexbox: 'no-2009' },
                          'nesting-rules': true,
                          'custom-media-queries': {
                            importFrom: path.join(
                              dir,
                              'node_modules/@hashicorp/mktg-global-styles/custom-media.css'
                            ),
                          },
                          'custom-properties': false,
                        },
                      },
                      presetEnvOptions || {}
                    )
                  ),
                  normalize({ browsers: 'defaults' }),
                  ...afterPlugins,
                ]
              }
            })
          }
        )
        if (!hasAppliedModifications)
          throw new Error(
            'nextjs-scripts - PostCSS loader modifications were not applied! This may have been caused by an issue in a newer version of next. Please reach out in #team-web-platform.'
          )
        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options)
        }
        return config
      },
    })
  }
}
// look into oneOfs, match against the test property
function modifyLoaderConfig(rules, regexes, cb) {
  rules.map((rule) => {
    if (rule.oneOf) return modifyLoaderConfig(rule.oneOf, regexes, cb)
    regexes.map((regex) => {
      if (rule.test && rule.test.toString() === regex.toString()) cb(rule)
    })
  })
}
