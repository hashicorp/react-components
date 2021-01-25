module.exports = {
  root: true,
  extends: './node_modules/@hashicorp/nextjs-scripts/.eslintrc.js',
  /* Specify overrides here */

  globals: {
    // TODO: remove this once the change to nextjs-scripts is merged
    globalThis: false,
  },
}
