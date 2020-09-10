import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import {App} from './providers/App';
import {Redux} from './providers/Redux';
import {Config, debugDev} from './utils';
import {ErrorBoundary} from './providers/ErrorBoundary';
import {Navigation} from './providers';
import 'react-native-get-random-values';

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

AppRegistry.registerComponent(Config.app.name, () => Main);
if (Platform.OS === Config.os.web) {
  AppRegistry.runApplication(Config.app.name, {
    rootTag: document.getElementById('root'),
  });
}
