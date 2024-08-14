module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: true,
  },
  root: true,
  extends: ['@react-native', 'prettier'],
  ignorePatterns: ['node_modules/', 'android/', 'ios/', 'lib/', 'coverage/', '.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
};
