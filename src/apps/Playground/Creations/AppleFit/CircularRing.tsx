import React from 'react';
import { PixelRatio, StyleSheet } from 'react-native';
import { View } from '../../../../components';
import { CircularProgress } from './CircularProgress';
import { InitialKnob } from './InitialKnob';
import { MovingKnob } from './MovingKnob';
import { type Ring } from './types';

type RingProps = {
  ring: Ring;
  strokeWidth: number;
  theta: number;
};

export const CircularRing = ({ ring, strokeWidth, theta }: RingProps) => {
  const radius = PixelRatio.roundToNearestPixel(ring.size / 2);
  const styles = StyleSheet.create({
    container: { transform: [{ rotate: '-270deg' }] },
  });

  return (
    <View style={styles.container}>
      <CircularProgress
        radius={radius}
        ring={ring}
        theta={theta}
      />
      <InitialKnob
        backgroundColor={ring.start}
        radius={radius}
        strokeWidth={strokeWidth}
        theta={theta}
      />
      <MovingKnob
        backgroundColor={ring.end}
        radius={radius}
        strokeWidth={strokeWidth}
        theta={theta}
      />
    </View>
  );
};
