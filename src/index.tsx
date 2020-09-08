import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import {App} from './providers/App';
import {Redux} from './providers/Redux';
import {Config} from './utils';
import {ErrorBoundary} from './providers/ErrorBoundary';
import {Navigation} from './providers';

// debugDev();
export const Main = (): JSX.Element => {
  return (
    <ErrorBoundary>
      <Redux>
        <App>
          <Navigation />
        </App>
      </Redux>
    </ErrorBoundary>
  );
};

AppRegistry.registerComponent(Config.app.name, () => Main);
if (Platform.OS === Config.os.web) {
  AppRegistry.runApplication(Config.app.name, {
    rootTag: document.getElementById('root'),
  });
}
