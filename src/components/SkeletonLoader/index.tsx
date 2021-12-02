import React, { ReactElement, useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { LinearGradient, MaskedView } from '../../conversions';
import { useDriver } from '../../features/Animation';
import { padding } from '../../features/Config';
import { useColor } from '../../features/Theme';

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
  height = padding(10),
  width = padding(10),
  borderRadius = padding(5),
  backgroundColor,
  foregroundColor,
  duration = 1200,
}: Props): ReactElement => {
  const color = useColor();
  const bgColor = backgroundColor || color.background.secondary;
  const fgColor = foregroundColor || color.background.primaryA;
  const value = useRef(new Animated.Value(0)).current;
  const useNativeDriver = useDriver();
  const end = { x: 1, y: 0 };
  const start = { x: 0, y: 0 };
  const colors = [bgColor, fgColor, bgColor];
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
        colors={colors}
        end={end}
        start={start}
        style={foregroundStyles}
      />
    </MaskedView>
  );
};
