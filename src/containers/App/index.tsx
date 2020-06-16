import React, {ReactNode, memo} from 'react';
import {
  useAppState,
  useDeviceInfo,
  useDimensions,
  useKeyboard,
  useNetInfo,
} from './hooks';

type Props = {
  children: ReactNode;
};

export const App = memo(function App({children}: Props) {
  useNetInfo();
  useDeviceInfo();
  useDimensions();
  useAppState();
  useKeyboard();

  return <>{children}</>;
});
