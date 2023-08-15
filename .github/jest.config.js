module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp|ttf|otf|m4v|mov|mp4|mpeg|mpg|webm|aac|aiff|caf|m4a|mp3|wav|html|pdf|obj)$':
      '<rootDir>/.github/jest.files.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/node_modules/@react-native-google-signin/google-signin/jest/build/setup.js',
    '<rootDir>/.github/jest.setup.js',
  ],
  setupFiles: ['<rootDir>/node_modules/jest-offline'],
  coverageDirectory: '<rootDir>/.cache/jest',
  rootDir: '../',
  globals: {
    window: {},
  },
};
