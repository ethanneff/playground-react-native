import React from 'react';
import { Platform } from 'react-native';

export const debugDev = (): void => {
  if (Platform.OS === 'web' || !__DEV__) return;

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
