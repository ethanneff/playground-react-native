import React, {ReactNode, memo} from 'react';
import {StyleSheet, View} from 'react-native';

interface ButtonRowProps {
  children: ReactNode | ReactNode[];
}

export default memo(function ButtonsRow({children}: ButtonRowProps) {
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
});
