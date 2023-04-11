import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';
import { spacing, useColors, useDriver } from '../../features';
import { getWidth, useAppSelector } from '../../redux';
import { MaskedView } from '../MaskedView';
import { View } from '../View';

type Props = {
  backgroundColor?: string;
  borderRadius?: number;
  duration?: number;
  foregroundColor?: string;
  height?: number;
  width?: number;
};

export const SkeletonLoader = ({
  backgroundColor,
  borderRadius = spacing(5),
  duration = 1200,
  foregroundColor,
  height = spacing(10),
  width = spacing(10),
}: Props) => {
  const colors = useColors();
  const bgColor = backgroundColor ?? colors.background.secondary;
  const fgColor = foregroundColor ?? colors.background.primaryA;
  const deviceWidth = useAppSelector(getWidth);
  const useNativeDriver = useDriver();
  const value = useRef(new Animated.Value(0)).current;
  const translateX = value.interpolate({
    inputRange: [0, 1],
    outputRange: [-deviceWidth, deviceWidth],
  });

  const styles = StyleSheet.create({
    background: { ...StyleSheet.absoluteFillObject, backgroundColor: bgColor },
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

  useEffect(() => {
    Animated.loop(
      Animated.timing(value, {
        duration,
        easing: Easing.bezier(0.5, 0, 0.75, 1),
        toValue: 1,
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
      <Animated.View style={{ transform: [{ translateX }] }}>
        <Svg
          height="100%"
          width={deviceWidth}
        >
          <Defs>
            <LinearGradient id="grad-1">
              <Stop
                offset="0%"
                stopColor={bgColor}
                stopOpacity="1"
              />
              <Stop
                offset="50%"
                stopColor={fgColor}
                stopOpacity="1"
              />
              <Stop
                offset="100%"
                stopColor={bgColor}
                stopOpacity="1"
              />
            </LinearGradient>
          </Defs>
          <Rect
            fill="url(#grad-1)"
            height="100%"
            width="100%"
          />
        </Svg>
      </Animated.View>
    </MaskedView>
  );
};
