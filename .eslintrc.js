module.exports = {
  parser: '@typescript-eslint/parser',
  extends: 'react-app',
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  plugins: ['@typescript-eslint'],
};
