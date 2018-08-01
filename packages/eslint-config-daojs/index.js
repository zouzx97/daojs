module.exports = {
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:lodash/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018
  },

  rules: {
    'linebreak-style': 'off',
    'lodash/import-scope': 'warn',
    'lodash/chaining': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js']
      }
    ]
  }
};
