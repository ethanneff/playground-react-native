import React, {memo, ReactElement} from 'react';
import {StyleSheet, View} from 'react-native';
import {useColor} from '../../hooks';
import {Theme} from '../../utils';

type AlertProps = {children: ReactElement | ReactElement[]};

export const Alert = memo(function Alert({children}: AlertProps): ReactElement {
  const color = useColor();
  const styles = StyleSheet.create({
    modal: {
      backgroundColor: color.background,
      borderRadius: Theme.padding.p04,
      padding: Theme.padding.p04,
    },
    overlay: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
  });

  return (
    <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
      <View style={styles.modal}>{children}</View>
    </View>
  );
});
