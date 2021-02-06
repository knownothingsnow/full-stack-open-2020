module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true
  },
  extends: [
    'standard',
    'standard-jsx',
    'standard-react'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  parser: 'babel-eslint'
}
