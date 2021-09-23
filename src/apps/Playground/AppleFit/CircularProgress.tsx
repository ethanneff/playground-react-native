import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { HalfCircle } from './HalfCircle';
import { Ring } from './types';

interface CircularProgressProps {
  theta: number;
  ring: Ring;
  radius: number;
}

export const CircularProgress = ({
  theta,
  ring,
  radius,
}: CircularProgressProps): JSX.Element => {
  const PI = Math.PI;
  const rotate = Math.max(0, theta - PI * 2);
  const progress = new Animated.Value(theta);
  const opacity = theta < PI;
  const spin = progress.interpolate({
    inputRange: [PI, 2 * PI],
    outputRange: ['0rad', `${PI}rad`],
    extrapolate: 'clamp',
  });
  const styles = StyleSheet.create({
    bottom: { transform: [{ rotate: '180deg' }] },
    container: { transform: [{ rotate: `${rotate}rad` }] },
    left: {
      ...StyleSheet.absoluteFillObject,
      opacity: Number(opacity),
      transform: [
        { translateX: 0 },
        { translateY: radius / 2 },
        { rotate: `${theta}rad` },
        { translateY: (radius / 2) * -1 },
      ],
    },
    top: { zIndex: 1 },
  });
  return (
    <Animated.View style={styles.container}>
      <View style={styles.top}>
        <HalfCircle flip radius={radius} ring={ring} type="foreground" />
        <Animated.View style={styles.left}>
          <HalfCircle radius={radius} ring={ring} type="background" />
        </Animated.View>
      </View>
      <View style={styles.bottom}>
        <HalfCircle radius={radius} ring={ring} type="foreground" />
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: [
              { translateX: 0 },
              { translateY: radius / 2 },
              { rotate: spin },
              { translateY: (radius / 2) * -1 },
            ],
          }}
        >
          <HalfCircle radius={radius} ring={ring} type="background" />
        </Animated.View>
      </View>
    </Animated.View>
  );
};
