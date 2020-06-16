import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import {App, Navigation, Redux} from './containers';
import {Config, debugDev} from './utils';

debugDev();
export var Main = () => {
  return (
    <Redux>
      <App>
        <Navigation />
      </App>
    </Redux>
  );
};

AppRegistry.registerComponent(Config.app.name, () => Main);
if (Platform.OS === Config.os.web) {
  AppRegistry.runApplication(Config.app.name, {
    rootTag: document.getElementById('root'),
  });
}
