module.exports = {
  extends: ['prettier', 'standard'],
  plugins: ['prettier', 'node'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
      },
    ],
  },
};
