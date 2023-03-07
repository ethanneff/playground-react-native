import { type ReactElement } from 'react';
import {
  useAppState,
  useDeviceInfo,
  useDimensions,
  useKeyboard,
  useLocalization,
  useNetInfo,
} from './hooks';

type Props = {
  children: ReactElement;
};

export const AppProvider = ({ children }: Props) => {
  useNetInfo();
  useDimensions();
  useKeyboard();
  useAppState();
  useLocalization();
  useDeviceInfo();

  return children;
};
