import { type ReactNode } from 'react';

type Properties = {
  children: ReactNode;
};
export const KeyboardAwareScrollView = ({ children }: Properties): ReactNode =>
  children;
