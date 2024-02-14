import React from 'react';
import { Animated, StyleSheet } from 'react-native';

type InitialKnobProperties = {
  readonly backgroundColor: string;
  readonly radius: number;
  readonly strokeWidth: number;
  readonly theta: number;
};

export const InitialKnob = ({
  backgroundColor,
  radius,
  strokeWidth,
  theta,
}: InitialKnobProperties) => {
  const visible = Number(theta < Math.PI * 2);
  const half = strokeWidth / 2;
  const styles = StyleSheet.create({
    knob: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor,
      borderRadius: half,
      height: strokeWidth,
      opacity: visible,
      top: radius - half,
      width: strokeWidth,
    },
  });
  return <Animated.View style={styles.knob} />;
};
