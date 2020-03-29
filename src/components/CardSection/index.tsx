import React, {memo} from 'react';
import {StyleSheet, TextStyle, View} from 'react-native';
import {useColor} from '../../hooks';

interface Props {
  style?: TextStyle;
}

export const CardSection: React.FC<Props> = memo(({style, children}) => {
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
