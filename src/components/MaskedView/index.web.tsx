import { type ReactNode } from 'react';

type Properties = {
  children: ReactNode;
};
export const MaskedView = ({ children }: Properties) => children;
