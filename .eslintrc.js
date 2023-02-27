module.exports = {
  root: true,
  env: { es6: true, node: true, browser: true, jest: true },
  extends: [ 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react_/recommended', 'plugin:react_-hooks/recommended', 'prettier' ],
  plugins: [ '@typescript-eslint', 'import', 'react', 'react_-hooks', '@emotion' ],
  settings: { 'import/resolver': { typescript: {} }, react: { version: 'detect' } },
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
  }
};
