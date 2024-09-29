module.exports = {
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: ['react-native-reanimated/plugin'],
  presets: ['module:@react-native/babel-preset'],
};
