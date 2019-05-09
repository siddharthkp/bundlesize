module.exports = {
  parser: 'babel-eslint',
  extends: ['prettier', 'standard'],
  plugins: ['prettier', 'node'],
  rules: {
    'prettier/prettier': 'error',
    'comma-dangle': ['error', 'always-multiline'],
  },
}
