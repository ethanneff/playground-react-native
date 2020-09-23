import React, {useEffect} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MaskedView} from '../../conversions';
import {useColor, useNativeDriver} from '../../hooks';
import {Theme} from '../../utils';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type Props = {
  height?: number;
  width?: number;
  borderRadius?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  duration?: number;
};

export const SkeletonLoader = ({
  height = Theme.padding.p10,
  width = Theme.padding.p10,
  borderRadius = Theme.padding.p05,
  backgroundColor,
  foregroundColor,
  duration = 1200,
}: Props): JSX.Element => {
  const color = useColor();
  const bgColor = backgroundColor || color.surface;
  const fgColor = foregroundColor || color.background;
  const value = new Animated.Value(0);
  const useDriver = useNativeDriver();
  const end = {x: 1, y: 0};
  const start = {x: 0, y: 0};
  const colors = [bgColor, fgColor, bgColor];
  const translateX = value.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });
  const styles = StyleSheet.create({
    background: {...StyleSheet.absoluteFillObject, backgroundColor: bgColor},
    foreground: {...StyleSheet.absoluteFillObject},
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
  const foregroundStyles = [styles.foreground, {transform: [{translateX}]}];

  useEffect(() => {
    Animated.loop(
      Animated.timing(value, {
        toValue: 1,
        duration,
        easing: Easing.bezier(0.5, 0, 0.25, 1),
        useNativeDriver: useDriver,
      }),
    ).start();
  }, [duration, useDriver, value]);

  return (
    <MaskedView
      maskElement={<View style={styles.maskElement} />}
      style={styles.maskElementContainer}>
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
