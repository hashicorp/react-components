module.exports = {
  parser: 'babel-eslint',

  plugins: ['jsx-a11y', 'react', 'prettier'],

  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    jest: true,
    mocha: true,
  },

  globals: {
    // Cypress globals taken from: https://github.com/cypress-io/eslint-plugin-cypress/blob/master/index.js#L15-L19
    cy: false,
    Cypress: false,
    expect: false,
    assert: false,
    chai: false,
  },

  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  ignorePatterns: ['public/'],

  settings: {
    react: {
      version: 'detect',
    },
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link href={ url } />
      'Hyperlink',
      { name: 'Link', linkAttribute: 'href' },
    ],
  },

  overrides: [
    {
      files: ['**/*.ts?(x)'],

      parser: '@typescript-eslint/parser',

      parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },

        // typescript-eslint specific options
        warnOnUnsupportedTypeScriptVersion: true,
      },

      plugins: ['@typescript-eslint', 'prettier'],

      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
        'prettier/react',
      ],

      rules: {
        // TypeScript's `noFallthroughCasesInSwitch` option is more robust (#6906)
        'default-case': 'off',
        // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/291)
        'no-dupe-class-members': 'off',
        // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/477)
        'no-undef': 'off',

        // Add TypeScript specific rules (and turn off ESLint equivalents)
        '@typescript-eslint/consistent-type-assertions': 'warn',
        'no-array-constructor': 'off',
        '@typescript-eslint/no-array-constructor': 'warn',
        '@typescript-eslint/no-namespace': 'error',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'warn',
          {
            functions: false,
            classes: false,
            variables: false,
            typedefs: false,
          },
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            args: 'none',
            ignoreRestSiblings: true,
          },
        ],
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'warn',

        // This is really verbose, and requires the author to add a lot of
        // types that are already inferred by Typescript (so you'll see them in
        // an IDE like VSCode just fine). We may want it eventually, but I
        // suspect it will slow people down when doing page conversions. Note
        // that `tslint:recommended` turns this kind of checking off.
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },

    // This override turns off some rules for Dato Typescript files, since they
    // are generated
    {
      files: ['types/dato/*'],
      rules: {
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/class-name-casing': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],

  rules: {
    // An odd rule that leads to odd code patterns, we are opting to disable it for our projects (https://app.asana.com/0/1100423001970639/1199667739287945/f)
    'no-prototype-builtins': 'off',

    // Not necessary in Next.js (https://spectrum.chat/next-js/general/react-must-be-in-scope-when-using-jsx~6193ef62-4d5e-4681-8f51-8c7bf6b9d56d)
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
    'react/no-array-index-key': 1,
    'react/no-unknown-property': [
      2,
      {
        ignore: ['class'],
      },
    ],

    // https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules
    'jsx-a11y/accessible-emoji': 'warn',
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-has-content': 'warn',

    // Workaround for Next.js (https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/402#issuecomment-368305051)
    'jsx-a11y/anchor-is-valid': [
      'warn',
      {
        components: ['Link'],
        specialLink: ['href'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],

    'jsx-a11y/aria-activedescendant-has-tabindex': 'warn',
    'jsx-a11y/aria-props': 'warn',
    'jsx-a11y/aria-proptypes': 'warn',
    'jsx-a11y/aria-role': ['warn', { ignoreNonDOM: true }],
    'jsx-a11y/aria-unsupported-elements': 'warn',
    'jsx-a11y/heading-has-content': 'warn',
    'jsx-a11y/iframe-has-title': 'warn',
    'jsx-a11y/img-redundant-alt': 'warn',
    'jsx-a11y/no-access-key': 'warn',
    'jsx-a11y/no-distracting-elements': 'warn',
    'jsx-a11y/no-redundant-roles': 'warn',
    'jsx-a11y/role-has-required-aria-props': 'warn',
    'jsx-a11y/role-supports-aria-props': 'warn',
    'jsx-a11y/scope': 'warn',
  },
}
