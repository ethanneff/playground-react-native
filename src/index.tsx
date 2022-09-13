import React, { StrictMode } from 'react';
import { AppRegistry, LogBox, Platform } from 'react-native';
import 'react-native-get-random-values';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary, Toast, toastConfig } from './components';
import { GestureHandlerProvider } from './conversions';
import { AppProvider, debugDev, NavigationProvider } from './features';
import { ReduxProvider } from './redux/core';

// TODO: why
LogBox.ignoreLogs(['Warning: Using UNSAFE']);

debugDev();

export const Main = (): JSX.Element => {
  return (
    <StrictMode>
      <SafeAreaProvider>
        <GestureHandlerProvider style={{ flex: 1 }}>
          <ReduxProvider>
            <ErrorBoundary>
              <AppProvider>
                <NavigationProvider />
              </AppProvider>
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
