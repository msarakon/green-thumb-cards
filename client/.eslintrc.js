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
  'parser': '@typescript-eslint/parser',
  'plugins': [
      'react',
      '@typescript-eslint'
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
      'react/prop-types': ['off'],
      'no-unused-vars': ['off'],
      '@typescript-eslint/no-unused-vars': [
          'error', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }
      ],
      'no-console': ['off']
  }
}