import React from 'react';

export const debugDev = (): void => {
  if (!__DEV__) {
    return;
  }
  const DevMenu = require('react-native-dev-menu');
  DevMenu.addItem('Highlight Renders', () => {
    require('react-native-highlight-updates');
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    const ReactRedux = require('react-redux');
    whyDidYouRender(React, {
      trackAllPureComponents: true,
      trackExtraHooks: [[ReactRedux, 'useSelector']],
    });
  });
};
