import React from 'react';
import { connectToDevTools } from 'react-devtools-core';
import { Platform } from 'react-native';

export const debugDev = (): void => {
  if (Platform.OS === 'web' || !__DEV__) return;

  connectToDevTools({ host: 'localhost', port: 8097 });
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
