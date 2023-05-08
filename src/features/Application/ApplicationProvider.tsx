import { type ReactElement } from 'react';
import {
  useAppState,
  useDeviceInfo,
  useDimensions,
  useKeyboard,
  useNetInfo,
} from './useApplicationHooks';

type Props = {
  children: ReactElement;
};

export const ApplicationProvider = ({ children }: Props) => {
  useNetInfo();
  useDimensions();
  useKeyboard();
  useAppState();
  useDeviceInfo();

  return children;
};
