import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { padding } from '../../../features';

type RowProps = { children: ReactNode };
export const Row = ({ children }: RowProps) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: padding(4),
      }}
    >
      {children}
    </View>
  );
};
