import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { spacing } from '../../../features';

type RowProps = { children: ReactNode };
export const Row = ({ children }: RowProps) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: spacing(4),
      }}
    >
      {children}
    </View>
  );
};
