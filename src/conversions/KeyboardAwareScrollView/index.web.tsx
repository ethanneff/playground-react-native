import React, { ReactElement } from 'react';
import { View } from 'react-native';

type Props = {
  children: ReactElement;
};
export const KeyboardAwareScrollView = ({ children }: Props): ReactElement => {
  return <View>{children}</View>;
};
