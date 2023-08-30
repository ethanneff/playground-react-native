import React, { StrictMode } from 'react';
import { AppRegistry, LogBox, Platform } from 'react-native';
import 'react-native-get-random-values';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableFreeze } from 'react-native-screens';
import { ErrorBoundary, Toast, toastConfig } from './components';
import { CodePush, GestureHandlerProvider } from './conversions';
import { ApplicationProvider, NavigationProvider, debugDev } from './features';
import { ReduxProvider } from './redux/ReduxProvider';

LogBox.ignoreLogs(['UNSAFE_']);

debugDev();
enableFreeze(true);

const Providers = () => (
  <StrictModeProvider>
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
  </StrictModeProvider>
);

export const Main = CodePush.wrapper(Providers);
AppRegistry.registerComponent('core', () => Main);
if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root');
  AppRegistry.runApplication('core', { rootTag });
}
