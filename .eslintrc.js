module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: '@react-native-community',
  ignorePatterns: [
    'node_modules/',
    'coverage/',
    'android/',
    'ios/',
    'src/utils/TestMocks/',
  ],
  rules: {
    'react-native/no-inline-styles': 0, // TODO: remove
  },
};
