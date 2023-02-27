module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp|ttf|otf|m4v|mov|mp4|mpeg|mpg|webm|aac|aiff|caf|m4a|mp3|wav|html|pdf|obj)$':
      '<rootDir>/src/mocks/Files/index.js',
    '^react-native$': 'react-native-web',
  },
  transformIgnorePatterns: [
    './node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation|@react-native-firebase|@react-native|@testing-library|uuid)',
  ],
  setupFiles: [
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/src/mocks/Setup/index.ts',
  ],
  rootDir: '../',
  globals: {
    window: {},
  },
};
