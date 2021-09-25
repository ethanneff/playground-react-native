module.exports = {
  transformer: {
    getTransformOptions: () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true,
      },
    }),
  },
};
