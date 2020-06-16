module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native-community',
    'plugin:react/all',
    'plugin:react-native/all',
  ],
  plugins: ['import'],
  ignorePatterns: [
    'node_modules/',
    'coverage/',
    'android/',
    'ios/',
    'src/utils/TestMocks/',
  ],
  rules: {
    // add
    'sort-imports': ['error', {ignoreDeclarationSort: true}],
    'import/order': 'error',
    'react/function-component-definition': [
      'error',
      {namedComponents: 'arrow-function', unnamedComponents: 'arrow-function'},
    ],
    // ignore
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-max-props-per-line': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/jsx-one-expression-per-line': 'off',
    // TODO: remove
    'react-native/no-inline-styles': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-max-depth': 'off',
    'react/forbid-component-props': 'off',
    'react/no-multi-comp': 'off',
    'react/no-array-index-key': 'off',
  },
};
