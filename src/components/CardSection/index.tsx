import React, {memo, ReactNode} from 'react';
import {StyleSheet, TextStyle, View} from 'react-native';
import {useColor} from '../../hooks';

interface Props {
  style?: TextStyle;
  children: ReactNode;
}

export const CardSection = memo(({style, children}: Props) => {
  const color = useColor();
  const styles = StyleSheet.create({
    containerStyle: {
      backgroundColor: color.background,
      borderBottomWidth: 0.5,
      borderColor: color.dark,
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
  });
  return <View style={[styles.containerStyle, style]}>{children}</View>;
});
