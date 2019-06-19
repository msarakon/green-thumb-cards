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
      'no-unused-vars': ['off'],
      'typescript/no-unused-vars': ['off'],
      'no-console': ['off']
  }
}