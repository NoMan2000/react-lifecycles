module.exports = {
    extends: ['plugin:flowtype/recommended', 'plugin:prettier/recommended'],
    plugins: ['flowtype'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true
        }
      ],
      quotes: [
        2,
        'single',
        {
          avoidEscape: true
        }
      ]
    },
    parserOptions: {
      ecmaVersion: 2018
    },
    env: {
      jest: true,
      es6: true
    }
  };
