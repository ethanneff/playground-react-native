import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../../../components';
import { useColors, type MonoMultiColor } from '../../../../features';

type Properties = {
  readonly backgroundColor: keyof MonoMultiColor;
  readonly radius: number;
};

export const CenterCircle = ({ backgroundColor, radius }: Properties) => {
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
};
