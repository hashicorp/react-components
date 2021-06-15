const { rules: cssModulesRules } = require('stylelint-config-css-modules')

/** Options directly imported from stylelint-config-css-modules */
const cssModulesSelectorPseudoClassNoUnknownOptions =
  cssModulesRules['selector-pseudo-class-no-unknown'][1]

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-prettier',
  ],
  plugins: [
    'stylelint-media-use-custom-media',
    'stylelint-order',
    'stylelint-use-nesting',
    'stylelint-value-no-unknown-custom-properties',
  ],
  ignoreFiles: ['public/**/*.css', 'out/**/*.css'],
  rules: {
    'csstools/use-nesting': 'always',

    // monospace must be duplicated
    // un-duplicated, it causes the font size to change
    'font-family-no-duplicate-names': [
      true,
      { ignoreFontFamilyNames: ['monospace'] },
    ],

    // object-fit font family names are used as a polyfill in IE
    // see: https://github.com/fregante/object-fit-images
    'font-family-no-missing-generic-family-keyword': [
      true,
      { ignoreFontFamilies: ['/^object-fit:/'] },
    ],

    // this causes too many changes at the moment
    // it can be added back in later
    'no-descending-specificity': null,

    // a rule from stylelint-config-css-modules is overridden here
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          ...cssModulesSelectorPseudoClassNoUnknownOptions.ignorePseudoClasses,
          // :first/:last pseudos are used for print css (e.g. `@page :first`)
          // see: https://github.com/stylelint/stylelint/issues/1871
          'first',
          'last',
        ],
      },
    ],

    // imported compose classes may be camelCased (e.g. `visuallyHidden`)
    'value-keyword-case': [
      'lower',
      {
        ignoreProperties: ['composes'],
      },
    ],
  },
}
