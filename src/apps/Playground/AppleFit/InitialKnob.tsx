import React from 'react';
import {Animated, StyleSheet} from 'react-native';

type InitialKnobProps = {
  theta: number;
  backgroundColor: string;
  radius: number;
  strokeWidth: number;
};

export const InitialKnob = ({
  theta,
  backgroundColor,
  radius,
  strokeWidth,
}: InitialKnobProps) => {
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
