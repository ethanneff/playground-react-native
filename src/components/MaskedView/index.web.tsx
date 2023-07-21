import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export const MaskedView = ({ children }: Props) => children;
