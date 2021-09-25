module.exports = {
  extends: [
    '@react-native-community',
    'eslint:all',
    'plugin:jest/all',
    'plugin:react/all',
    'plugin:react-native/all',
    'plugin:sonarjs/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: [
    'node_modules/',
    'coverage/',
    'android/',
    'ios/',
    'build/',
    'src/mocks/',
    'src/conversions/',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import',
    'prettier',
    'sort-keys-fix',
    'sonarjs',
  ],
  root: true,
  rules: {
    'prettier/prettier': 'error', // prettier
    '@typescript-eslint/no-use-before-define': 'error', // typescript
    'import/no-cycle': 'error', // no circular dependencies
    'import/no-unresolved': ['error', { ignore: ['root-types'] }], // redux typing imports
    'react-hooks/exhaustive-deps': [
      'error', // auto hook deps
      { enableDangerousAutofixThisMayCauseInfiniteLoops: true },
    ],
    'react/function-component-definition': [
      'error', // arrow functions
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    '@typescript-eslint/no-var-requires': 'off', // react native images
    'react/jsx-filename-extension': 'off', // typescript
    'react/require-default-props': 'off', // typescript
    'one-var': 'off', // use multiple const
    'sort-imports': 'off', // vscode import sorting
    'no-use-before-define': 'off', // typescript
    'default-param-last': 'off', // typescript
    'sort-keys': 'off', // sort-keys-fix
    'no-magic-numbers': 'off',
    'no-ternary': 'off',
    'react/jsx-max-depth': 'off',
    'max-lines-per-function': 'off',
    'max-statements': 'off',
    'max-lines': 'off',
    'no-nested-ternary': 'off',
    'class-methods-use-this': 'off',
    'capitalized-comments': 'off', // comments
    'multiline-comment-style': 'off', // comments
    'no-inline-comments': 'off', // comments
    'line-comment-position': 'off', // comments
    'no-plusplus': 'off', // for loops
    'id-length': 'off', // 'x' and 'y' variables
    'no-undefined': 'off', // react navigation types
    'react/jsx-one-expression-per-line': 'off', // prettier
    'react/jsx-max-props-per-line': 'off', // prettier
    'react/jsx-newline': 'off', // prettier
    'react/jsx-indent': 'off', // prettier
    'react/jsx-indent-props': 'off', // prettier
    'react-native/no-inline-styles': 'off', // react native style prop
    'react/forbid-component-props': 'off', // react native style prop
    'no-warning-comments': 'off', // remove
    'react/no-multi-comp': 'off', // remove
    'no-console': 'off', // remove
  },
  settings: {
    'import/ignore': ['react-native'],
  },
};
