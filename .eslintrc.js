const restrictedImports = {
  paths: [
    {
      name: 'react-native',
      importNames: [
        'View',
        'ActivityIndicator',
        'Button',
        'SafeAreaView',
        'FlatList',
        'ScrollView',
        'ListRenderItem',
        'Switch',
        'FlatListProps',
        'Text',
        'TextInput',
        'Pressable',
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
    { name: 'lottie-react-native', message: 'use Wrapper' },
    { name: '@react-navigation/core', message: 'use Wrapper' },
    { name: '@react-navigation/native', message: 'use Wrapper' },
    { name: '@react-navigation/native-stack', message: 'use Wrapper' },
    { name: '@react-navigation/bottom-tabs', message: 'use Wrapper' },
    { name: '@shopify/flash-list', message: 'use Components' },
    {
      name: 'react-redux',
      importNames: ['useSelector', 'useDispatch'],
      message: 'use Wrappers',
    },
  ],
};

module.exports = {
  extends: [
    // generic
    'eslint:all',
    'plugin:sonarjs/recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:etc/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:unicorn/recommended',
    'plugin:regexp/recommended',
    // testing
    'plugin:testing-library/react',
    'plugin:jest/all',
    // react
    'plugin:react/all',
    'plugin:react-native/all',
    'plugin:react-redux/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/react',
    // typescript
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:typescript-sort-keys/recommended',
    'plugin:import/typescript',
    // styling
    'prettier',
  ],
  env: { node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: { project: ['./tsconfig.json'] },
  ignorePatterns: ['react-app-env.d.ts'],
  plugins: [
    'react',
    'react-hooks',
    'react-native',
    'react-redux',
    'testing-library',
    'jsx-a11y',
    'import',
    'jest',
    'etc',
    '@typescript-eslint',
    'sonarjs',
    'sort-keys-fix',
    'sort-destructure-keys',
    'typescript-sort-keys',
    '@stylistic',
  ],
  root: true,
  rules: {
    // imports
    'import/no-unresolved': ['error', { ignore: ['root-types'] }], // redux typing imports
    'no-restricted-imports': ['error', restrictedImports],
    // react-native
    '@typescript-eslint/no-var-requires': 'off', // images
    '@typescript-eslint/no-require-imports': 'off', // images
    'unicorn/prefer-module': 'off',
    // typescript
    'react/jsx-filename-extension': 'off',
    'react/require-default-props': 'off',
    'default-param-last': 'off',
    '@stylistic/member-delimiter-style': 'error',
    '@typescript-eslint/method-signature-style': 'error',
    '@typescript-eslint/no-confusing-void-expression': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-useless-empty-export': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/prefer-regexp-exec': 'error',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/sort-type-constituents': 'error',
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      { allowNumber: true },
    ],
    '@stylistic/type-annotation-spacing': 'error',
    // sorting
    'sort-destructure-keys/sort-destructure-keys': 'error',
    'sort-keys': [
      'error',
      'asc',
      { caseSensitive: true, natural: true, minKeys: 2 },
    ],
    'sort-keys-fix/sort-keys-fix': [
      'error',
      'asc',
      { caseSensitive: true, natural: true },
    ],
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': 'error',
    'sort-imports': 'off',
    // style
    'eslint-comments/no-unused-disable': 'error',
    'unicorn/filename-case': 'off',
    'unicorn/no-null': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
        disallowTypeAnnotations: false,
      },
    ],
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
    'no-plusplus': 'off', // for loops
    'id-length': 'off', // x and y variables
    'no-undefined': 'off', // react navigation types
    // comments
    'capitalized-comments': 'off',
    'multiline-comment-style': 'off',
    'no-inline-comments': 'off',
    'line-comment-position': 'off',
    // turn back on eventually
    'jest/require-hook': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'react-native/no-inline-styles': 'off',
    'react-redux/useSelector-prefer-selectors': 'off',
    'react/forbid-component-props': 'off',
    'no-warning-comments': 'off',
    'react/no-multi-comp': 'off',
    'no-console': 'off',
    'sonarjs/cognitive-complexity': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
  },
  settings: {
    'import/ignore': ['react-native'],
    react: { version: 'detect' },
  },
};
