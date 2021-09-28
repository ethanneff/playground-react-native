import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export const MaskedView = ({ children }: Props): JSX.Element => {
  return <>{children}</>;
};
