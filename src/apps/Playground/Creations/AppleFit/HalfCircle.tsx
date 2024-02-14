import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../../../components';
import { AngularGradient } from './AngularGradient';
import { type Ring } from './types';

type Properties = {
  readonly flip?: boolean;
  readonly radius: number;
  readonly ring: Ring;
  readonly type: 'background' | 'foreground';
};

export const HalfCircle = ({ flip, radius, ring, type }: Properties) => {
  const colors: [string, string] = [ring.start, ring.end];
  const fg = (
    <AngularGradient
      colors={colors}
      size={ring.size}
    />
  );
  const bg = <View style={{ backgroundColor: ring.bg, flex: 1 }} />;
  const styles = StyleSheet.create({
    circle: {
      borderRadius: radius,
      height: radius * 2,
      overflow: 'hidden',
      transform: [{ rotate: flip ? '180deg' : '0deg' }],
      width: radius * 2,
    },
    container: {
      height: radius,
      overflow: 'hidden',
      width: radius * 2,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.circle}>{type === 'foreground' ? fg : bg}</View>
    </View>
  );
};
