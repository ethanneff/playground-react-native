module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native-community',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/all',
    'plugin:react/all',
    'plugin:react-native/all',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  ignorePatterns: [
    'node_modules/',
    'coverage/',
    'android/',
    'ios/',
    'build/',
    'src/mocks/',
    'src/conversions/',
  ],
  rules: {
    // Added
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react-hooks/exhaustive-deps': [
      'error',
      { enableDangerousAutofixThisMayCauseInfiniteLoops: true },
    ],
    'import/no-cycle': 'error',
    'import/no-unresolved': ['error', { ignore: ['root-types'] }],
    curly: ['error', 'multi', 'consistent'],
    // Ignored (outside prettier and typescript rules)
    '@typescript-eslint/no-var-requires': 'off',
    'react/require-default-props': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-max-props-per-line': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-newline': 'off',
    // TODO: remove (good rules with extra effort)
    '@typescript-eslint/no-explicit-any': 'off',
    'react-native/no-inline-styles': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-max-depth': 'off',
    'react/forbid-component-props': 'off',
    'react/no-multi-comp': 'off',
    'react/no-array-index-key': 'off',
  },
  settings: {
    'import/ignore': ['react-native'],
  },
};
