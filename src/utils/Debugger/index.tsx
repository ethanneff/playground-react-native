import React from 'react';

export const debugDev = () => {
  if (!__DEV__) {
    return;
  }
  require('react-native-highlight-updates');
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  const ReactRedux = require('react-redux');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [[ReactRedux, 'useSelector']],
  });
};
