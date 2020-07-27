import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Shadow} from './Shadow';

type MovingKnobProps = {
  backgroundColor: string;
  radius: number;
  strokeWidth: number;
  theta: number;
};

export const MovingKnob = ({
  backgroundColor,
  radius,
  strokeWidth,
  theta,
}: MovingKnobProps) => {
  const half = strokeWidth / 2;
  const transform = [
    {translateX: radius - half},
    {rotate: `${theta}rad`},
    {translateX: -(radius - half)},
  ];
  const styles = StyleSheet.create({
    knob: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: half,
      height: strokeWidth,
      top: radius - half,
      width: strokeWidth,
    },
  });

  return (
    <>
      <Animated.View
        style={[styles.knob, {transform: [...transform, {translateY: -4}]}]}>
        <Shadow strokeWidth={strokeWidth} />
      </Animated.View>
      <Animated.View style={[styles.knob, {backgroundColor, transform}]} />
    </>
  );
};
