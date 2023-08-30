import React from 'react';
import { ErrorBoundary as ErrorBoundaryProvider } from 'react-error-boundary';
import { AppRegistry, LogBox, Platform } from 'react-native';
import 'react-native-get-random-values';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableFreeze } from 'react-native-screens';
import { ErrorFallback, Toast, toastConfig } from './components';
import { CodePush, GestureHandlerProvider } from './conversions';
import {
  ApplicationProvider,
  NavigationProvider,
  StrictModeProvider,
  debugDev,
} from './features';
import { ReduxProvider } from './redux/ReduxProvider';

LogBox.ignoreLogs(['UNSAFE_']);

debugDev();
enableFreeze(true);

const Providers = () => (
  <StrictModeProvider>
    <SafeAreaProvider>
      <GestureHandlerProvider style={{ flex: 1 }}>
        <ReduxProvider>
          <ErrorBoundaryProvider FallbackComponent={ErrorFallback}>
            <ApplicationProvider>
              <NavigationProvider />
            </ApplicationProvider>
            <Toast config={toastConfig} />
          </ErrorBoundaryProvider>
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
