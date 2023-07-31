module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    indent: 2,
    curly: 0,
    'no-trailing-spaces': 0,
    'eol-last': 0,
    'padded-blocks': 0,
    'no-multiple-empty-lines': 0,
    'operator-linebreak': 0,
    'multiline-ternary': 0,
    'comma-dangle': 0,
    'space-before-function-paren': 0,
    'no-unused-vars': 0,
    'no-case-declarations': 0
  }
}
