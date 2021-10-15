import React, { memo, ReactNode } from 'react';
import { LoadingScreen } from '../../components';
import {
  useAppState,
  useDeviceInfo,
  useDimensions,
  useKeyboard,
  useNetInfo,
} from './hooks';

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
    </>
  );
});
