import React from 'react';
import { Platform } from 'react-native';

export const debugDev = (): void => {
  if (Platform.OS === 'web' || !__DEV__) return;

  /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access  */
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
  /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access  */
};
