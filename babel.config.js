module.exports = {
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: ['react-native-reanimated/plugin'],
  presets: ['module:metro-react-native-babel-preset'],
};
