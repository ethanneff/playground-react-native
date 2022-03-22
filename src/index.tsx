import React from 'react';
import { AppRegistry, LogBox, Platform } from 'react-native';
import 'react-native-get-random-values';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from './components';
import { GestureHandlerProvider } from './conversions';
import { AppProvider, debugDev } from './features';
import { NavigationProvider } from './features/Navigation/core';
import { ReduxProvider } from './redux/core';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

debugDev();
export const Main = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <GestureHandlerProvider style={{ flex: 1 }}>
        <ReduxProvider>
          <ErrorBoundary>
            <AppProvider>
              <NavigationProvider />
            </AppProvider>
          </ErrorBoundary>
        </ReduxProvider>
      </GestureHandlerProvider>
    </SafeAreaProvider>
  );
};

AppRegistry.registerComponent('core', () => Main);
if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root');
  AppRegistry.runApplication('core', { rootTag });
}
