const path = require('path')

module.exports = {
  stories: [
    './boilerplate-stories/**/*.stories.mdx',
    './boilerplate-stories/**/*.stories.@(js|jsx|ts|tsx)',
    './stories-wip/components/**/*.stories.@(js|jsx|ts|tsx)',
    './stories/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    path.resolve('./.storybook/local-presets/preset-hashicorp-css'),
    path.resolve('./.storybook/local-presets/transpile-hashicorp-modules'),
    path.resolve('./.storybook/local-presets/load-graphql-fragments'),
    path.resolve('./.storybook/local-presets/allow-inline-raw-loading'),
  ],
}
