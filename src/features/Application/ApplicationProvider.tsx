import React, { type PropsWithChildren } from 'react';
import { View } from '../../components';
import {
  useAppState,
  useDeviceInfo,
  useDimensions,
  useKeyboard,
  useNetInfo,
} from './useApplicationHooks';

export const ApplicationProvider = ({ children }: PropsWithChildren) => {
  useNetInfo();
  useDimensions();
  useKeyboard();
  useAppState();
  useDeviceInfo();

  return <View flex={1}>{children}</View>;
};
