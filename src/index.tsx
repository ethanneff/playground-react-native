import React, { StrictMode } from 'react';
import { AppRegistry, LogBox, Platform } from 'react-native';
import 'react-native-get-random-values';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary, Toast, toastConfig } from './components';
import { GestureHandlerProvider } from './conversions';
import { ApplicationProvider, debugDev, NavigationProvider } from './features';
import { ReduxProvider } from './redux/ReduxProvider';

LogBox.ignoreLogs(['UNSAFE_']);

debugDev();

export const Main = (): JSX.Element => {
  return (
    <StrictMode>
      <SafeAreaProvider>
        <GestureHandlerProvider style={{ flex: 1 }}>
          <ReduxProvider>
            <ErrorBoundary>
              <ApplicationProvider>
                <NavigationProvider />
              </ApplicationProvider>
              <Toast config={toastConfig} />
            </ErrorBoundary>
          </ReduxProvider>
        </GestureHandlerProvider>
      </SafeAreaProvider>
    </StrictMode>
  );
};

AppRegistry.registerComponent('core', () => Main);
if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root');
  AppRegistry.runApplication('core', { rootTag });
}
