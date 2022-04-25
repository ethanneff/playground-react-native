module.exports = {
  extends: [
    'eslint:all',
    'plugin:jest/all',
    'plugin:react/all',
    'plugin:react-native/all',
    'plugin:sonarjs/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:typescript-sort-keys/recommended',
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
  env: { node: true },
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    'react-hooks',
    'react-native',
    'import',
    'jest',
    '@typescript-eslint',
    'sonarjs',
    'sort-keys-fix',
    'typescript-sort-keys',
  ],
  root: true,
  rules: {
    // imports
    'import/no-unresolved': ['error', { ignore: ['root-types'] }], // redux typing imports
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-native',
            importNames: [
              'ActivityIndicator',
              'Button',
              'FlatList',

              'ScrollView',
              'Switch',
              'Text',
              'TextInput',
              'TouchableHighlight',
              'TouchableNativeFeedback',
              'TouchableOpacity',
              'TouchableWithoutFeedback',
            ],
            message: 'use Components',
          },
          {
            name: 'react-native-gesture-handler',
            importNames: [
              'FlatList',
              'ScrollView',
              'Switch',
              'TextInput',
              'TouchableHighlight',
              'TouchableNativeFeedback',
              'TouchableOpacity',
              'TouchableWithoutFeedback',
            ],
            message: 'use Components',
          },
        ],
      },
    ],
    // react-native
    '@typescript-eslint/no-var-requires': 'off', // images
    // vscode
    'sort-keys': 'off',
    'sort-imports': 'off',
    // typescript
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    '@typescript-eslint/no-use-before-define': 'error',
    'no-use-before-define': 'off',
    'default-param-last': 'off',
    'react/jsx-filename-extension': 'off',
    'react/require-default-props': 'off',
    // style
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'error',
      { enableDangerousAutofixThisMayCauseInfiniteLoops: true },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'one-var': 'off',
    'no-magic-numbers': 'off',
    'no-ternary': 'off',
    'react/jsx-max-depth': 'off',
    'max-lines-per-function': 'off',
    'max-statements': 'off',
    'max-lines': 'off',
    'no-nested-ternary': 'off',
    'class-methods-use-this': 'off',
    'sonarjs/no-duplicate-string': 'off',
    'no-plusplus': 'off', // for loops
    'id-length': 'off', // 'x' and 'y' variables
    'no-undefined': 'off', // react navigation types
    // comments
    'capitalized-comments': 'off',
    'multiline-comment-style': 'off',
    'no-inline-comments': 'off',
    'line-comment-position': 'off',
    // prettier
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-max-props-per-line': 'off',
    'react/jsx-newline': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    // turn back on eventually
    'jest/require-hook': 'off',
    'react-native/no-inline-styles': 'off',
    'react/forbid-component-props': 'off',
    'no-warning-comments': 'off',
    'react/no-multi-comp': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'sonarjs/cognitive-complexity': 'off',
  },
  settings: {
    'import/ignore': ['react-native'],
    react: { version: 'detect' },
  },
};
