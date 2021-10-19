import React, { memo, ReactNode } from 'react';
import { AlertScreen } from './AlertScreen';
import {
  useAppState,
  useDeviceInfo,
  useDimensions,
  useKeyboard,
  useNetInfo,
} from './hooks';
import { LoadingScreen } from './LoadingScreen';

type Props = { children: ReactNode };

export const AppProvider = memo(function AppProvider({ children }: Props) {
  useNetInfo();
  useDeviceInfo();
  useDimensions();
  useAppState();
  useKeyboard();

  return (
    <>
      {children}
      <LoadingScreen />
      <AlertScreen />
    </>
  );
});
