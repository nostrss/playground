/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/nuxt3.js', 'plugin:storybook/recommended'],
}
