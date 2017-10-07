module.exports = {
  extends: ['prettier', 'standard'],
  plugins: ['prettier', 'node'],
  rules: {
    "space-before-function-paren": 0, // only here because prettier fails if you correct this
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
      }
    ],
  },
};
