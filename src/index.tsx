import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import 'react-native-get-random-values';
import {ErrorBoundary} from './components';
import {debugDev} from './features';
import {App, Navigation, Redux} from './providers';

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
