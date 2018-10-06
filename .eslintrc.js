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
    'comma-dangle': ["error", "always-multiline"],
  },
};
