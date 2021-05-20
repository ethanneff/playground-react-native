import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import 'react-native-get-random-values';
import {Colors} from './apps/Playground/Colors';
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
          <Colors />
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
