module.exports = {
  'env': {
      'browser': true,
      'es6': true,
      'jest': true,
      'node': true
  },
  'extends': [
      'eslint:recommended',
      'plugin:react/recommended'
  ],
  'parserOptions': {
      'ecmaFeatures': {
          'jsx': true
      },
      'ecmaVersion': 2018,
      'sourceType': 'module'
  },
  'plugins': [
      'react'
  ],
  'settings': {
      'react': {
          'version': 'detect'
      }
  },
  'rules': {
      'indent': [
          'error',
          4
      ],
      'quotes': [
          'error',
          'single'
      ],
      'semi': [
          'error',
          'always'
      ],
      'no-console': ['off']
  }
}