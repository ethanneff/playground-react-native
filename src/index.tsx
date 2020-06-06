import React, {memo} from 'react';
import {AppRegistry, Platform} from 'react-native';
import {App, Navigation, Redux} from './containers';
import {Config} from './utils';

if (Platform.OS !== Config.os.web && __DEV__) {
  require('react-native-highlight-updates');
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  const ReactRedux = require('react-redux');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [[ReactRedux, 'useSelector']],
  });
}

export const Main = memo(function Main() {
  return (
    <Redux>
      <App>
        <Navigation />
      </App>
    </Redux>
  );
});

AppRegistry.registerComponent(Config.app.name, () => Main);
if (Platform.OS === Config.os.web) {
  AppRegistry.runApplication(Config.app.name, {
    rootTag: document.getElementById('root'),
  });
}
