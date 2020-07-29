import React from 'react';
import {PixelRatio, StyleSheet, View} from 'react-native';
import {CircularProgress} from './CircularProgress';
import {InitialKnob} from './InitialKnob';
import {MovingKnob} from './MovingKnob';
import {Ring} from './AppleActivity';

interface RingProps {
  ring: Ring;
  strokeWidth: number;
  theta: number;
}

export const CircularRing = ({
  ring,
  theta,
  strokeWidth,
}: RingProps): JSX.Element => {
  const radius = PixelRatio.roundToNearestPixel(ring.size / 2);
  const styles = StyleSheet.create({
    container: {transform: [{rotate: '-270deg'}]},
  });

  // interpolateColor(theta, {
  //   inputRange: [0, Math.PI * 2],
  //   outputRange: [ring.start, ring.end],
  // });
  return (
    <View style={styles.container}>
      <CircularProgress radius={radius} ring={ring} theta={theta} />
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
