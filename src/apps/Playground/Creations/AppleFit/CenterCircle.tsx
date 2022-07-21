import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../../../components';
import { MonoMultiColor, useColors } from '../../../../features';

type Props = {
  backgroundColor: keyof MonoMultiColor;
  radius: number;
};

export const CenterCircle = memo(function CenterCircle({
  radius,
  backgroundColor,
}: Props) {
  const colors = useColors();
  const styles = StyleSheet.create({
    foreground: {
      backgroundColor: colors.background[backgroundColor],
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
