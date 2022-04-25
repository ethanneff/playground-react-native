import React, { ReactElement } from 'react';

type Props = {
  children: ReactElement;
};
export const KeyboardAwareScrollView = ({ children }: Props): ReactElement => {
  return <>{children}</>;
};
