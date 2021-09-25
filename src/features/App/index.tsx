import React, { memo, ReactNode } from 'react';
import { View } from 'react-native';
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

  return <View>{children}</View>;
});
