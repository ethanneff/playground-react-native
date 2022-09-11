import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export const MaskedView = ({ children }: Props) => {
  return children;
};
