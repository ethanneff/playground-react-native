import { type ReactElement } from 'react';
import {
  useAppState,
  useDeviceInfo,
  useDimensions,
  useKeyboard,
  useNetInfo,
} from './hooks';

type Props = {
  children: ReactElement;
};

export const AppProvider = ({ children }: Props) => {
  useNetInfo();
  useDeviceInfo();
  useDimensions();
  useAppState();
  useKeyboard();

  return children;
};
