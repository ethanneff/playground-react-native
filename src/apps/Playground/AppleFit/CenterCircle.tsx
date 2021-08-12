import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {MonoMultiColor, useColor} from '../../../features';

type Props = {
  radius: number;
  backgroundColor: keyof MonoMultiColor;
};

export const CenterCircle = memo(function CenterCircle({
  radius,
  backgroundColor,
}: Props) {
  const color = useColor();
  const styles = StyleSheet.create({
    foreground: {
      backgroundColor: color.background[backgroundColor],
      borderRadius: radius,
      height: radius * 2,
      width: radius * 2,
    },
    overlay: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.overlay}>
      <View style={styles.foreground} />
    </View>
  );
});
