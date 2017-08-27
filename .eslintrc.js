module.exports = {
  extends: ['prettier', 'airbnb-base'],
  plugins: ['prettier', 'import'],
  rules: {
    semi: 0,
    'no-param-reassign': 0,
    'array-callback-return': 0,
    'comma-dangle': 0,
    'arrow-parens': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
      },
    ],
  },
};
