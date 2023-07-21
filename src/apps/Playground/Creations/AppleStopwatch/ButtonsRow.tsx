import React, { type ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../../../components';

type ButtonRowProps = {
  readonly children: ReactNode | ReactNode[];
};

export const ButtonsRow = ({ children }: ButtonRowProps) => {
  const styles = StyleSheet.create({
    buttonsRow: {
      alignSelf: 'stretch',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 30,
      marginTop: 80,
    },
  });
  return <View style={styles.buttonsRow}>{children}</View>;
};
