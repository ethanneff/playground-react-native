module.exports = {
  preset: 'react-native',
  transform: {
    '.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp|ttf|otf|m4v|mov|mp4|mpeg|mpg|webm|aac|aiff|caf|m4a|mp3|wav|html|pdf|obj)$':
      '<rootDir>/src/mocks/Files/index.js',
  },
  transformIgnorePatterns: [
    './node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation|@react-native-firebase|@react-native)',
  ],
  setupFiles: [
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/src/mocks/Setup/index.ts',
  ],
  rootDir: '../',
  globals: {
    window: {},
  },
};
