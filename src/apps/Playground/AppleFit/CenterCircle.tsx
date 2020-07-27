import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  radius: number;
  backgroundColor: string;
};

export const CenterCircle = memo(function CenterCircle({
  radius,
  backgroundColor,
}: Props) {
  const styles = StyleSheet.create({
    foreground: {
      backgroundColor,
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
