import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import 'react-native-get-random-values';
import {ErrorBoundary} from './components';
import {AppProvider, debugDev} from './features';
import {NavigationProvider} from './features/Navigation/core';
import {ReduxProvider} from './redux/core';

debugDev();
export const Main = (): JSX.Element => {
  return (
    <ReduxProvider>
      <ErrorBoundary>
        <AppProvider>
          <NavigationProvider />
        </AppProvider>
      </ErrorBoundary>
    </ReduxProvider>
  );
};

AppRegistry.registerComponent('core', () => Main);
if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root');
  AppRegistry.runApplication('core', {rootTag});
}
