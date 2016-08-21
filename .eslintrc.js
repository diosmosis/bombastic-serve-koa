module.exports = {
  extends: "airbnb-base",
  plugins: [],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
  },
  rules: {
    semi: [2, "never"],
    "no-use-before-define": ["error", { "functions": false, "classes": true }],
    "prefer-arrow-callback": 0
  },
  env: {
    node: true
  }
};
