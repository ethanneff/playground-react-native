import React, {ReactNode} from 'react';
import {View} from 'react-native';

type Props = {
  children: ReactNode;
};
export const MaskedView = ({children}: Props): JSX.Element => {
  return <View>{children}</View>;
};
