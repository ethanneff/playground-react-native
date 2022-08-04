import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { useDriver } from '../../../../features';

type PulseAnimationProps = {
  repeat: boolean;
  style: StyleProp<ViewStyle>;
};

// TODO: move to storybook
export const PulseAnimation = ({ repeat, style }: PulseAnimationProps) => {
  const useNativeDriver = useDriver();
  const animation = useRef(new Animated.Value(0)).current;
  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        useNativeDriver,
        duration: 1000,
      }),
      { iterations: repeat ? -1 : 1 },
    ).start();
  }, [animation, repeat, useNativeDriver]);

  return (
    <Animated.View
      style={[style, { opacity, transform: [{ scale: animation }] }]}
    />
  );
};
