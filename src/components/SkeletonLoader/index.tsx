import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { View } from '../../components';
import { LinearGradient } from '../../components/LinearGradient';
import { spacing, useColors, useDriver } from '../../features';
import { MaskedView } from '../MaskedView';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type Props = {
  backgroundColor?: string;
  borderRadius?: number;
  duration?: number;
  foregroundColor?: string;
  height?: number;
  width?: number;
};

export const SkeletonLoader = ({
  height = spacing(10),
  width = spacing(10),
  borderRadius = spacing(5),
  backgroundColor,
  foregroundColor,
  duration = 1200,
}: Props) => {
  const colors = useColors();
  const bgColor = backgroundColor || colors.background.secondary;
  const fgColor = foregroundColor || colors.background.primaryA;
  const value = useRef(new Animated.Value(0)).current;
  const useNativeDriver = useDriver();
  const end = { x: 1, y: 0 };
  const start = { x: 0, y: 0 };
  const gradient = [bgColor, fgColor, bgColor];
  const translateX = value.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });
  const styles = StyleSheet.create({
    background: { ...StyleSheet.absoluteFillObject, backgroundColor: bgColor },
    foreground: { ...StyleSheet.absoluteFillObject },
    maskElement: {
      backgroundColor: bgColor,
      borderColor: fgColor,
      borderRadius,
      borderWidth: 1,
      height,
    },
    maskElementContainer: {
      height,
      width,
    },
  });
  const foregroundStyles = [styles.foreground, { transform: [{ translateX }] }];

  useEffect(() => {
    Animated.loop(
      Animated.timing(value, {
        toValue: 1,
        duration,
        easing: Easing.bezier(0.5, 0, 0.25, 1),
        useNativeDriver,
      }),
    ).start();
  }, [duration, useNativeDriver, value]);

  return (
    <MaskedView
      maskElement={<View style={styles.maskElement} />}
      style={styles.maskElementContainer}
    >
      <View style={styles.background} />
      <AnimatedLinearGradient
        colors={gradient}
        end={end}
        start={start}
        style={foregroundStyles}
      />
    </MaskedView>
  );
};
