import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import 'react-native-get-random-values';
import {Navigation} from './providers';
import {App} from './providers/App';
import {ErrorBoundary} from './providers/ErrorBoundary';
import {Redux} from './providers/Redux';
import {debugDev} from './utils';

debugDev();
export const Main = (): JSX.Element => {
  return (
    <Redux>
      <ErrorBoundary>
        <App>
          <Navigation />
        </App>
      </ErrorBoundary>
    </Redux>
  );
};

AppRegistry.registerComponent('core', () => Main);
if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root');
  AppRegistry.runApplication('core', {rootTag});
}
