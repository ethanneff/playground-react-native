import React, { useEffect, useState, type ReactNode } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  type ImageSourcePropType,
} from 'react-native';
import { MaskedView, View } from '../../components';
import { useDriver } from '../../features';
import { getSmallestDimension, useAppSelector } from '../../redux';

// TODO: convert to svg, remove mask, fade in and out

type Props = {
  readonly backgroundColor: string;
  readonly children: ReactNode;
  readonly delay?: number;
  readonly duration?: number;
  readonly primaryColor: string;
  readonly source: ImageSourcePropType;
};

const getInterpolate = (progress: Animated.Value) => ({
  bleed: {
    opacity: progress.interpolate({
      extrapolate: 'clamp',
      inputRange: [0, 25, 50],
      outputRange: [0, 0, 1],
    }),
  },
  fade: {
    opacity: progress.interpolate({
      extrapolate: 'clamp',
      inputRange: [0, 25, 75],
      outputRange: [1, 1, 0],
    }),
  },
  imageScale: {
    transform: [
      {
        scale: progress.interpolate({
          inputRange: [0, 20, 100],
          outputRange: [0.1, 0.02, 50],
        }),
      },
    ],
  },
});

export const SplashScreen = ({
  backgroundColor,
  children,
  delay = 300,
  duration = 1000,
  primaryColor,
  source,
}: Props) => {
  const smallest = useAppSelector(getSmallestDimension);
  const useNativeDriver = useDriver();
  const [state, setState] = useState({
    complete: false,
    progress: new Animated.Value(0),
  });
  const width = smallest * 4;
  const { bleed, fade, imageScale } = getInterpolate(state.progress);
  const primaryColorStyles = [
    StyleSheet.absoluteFill,
    { backgroundColor: primaryColor },
    fade,
  ];
  const imageStyles = [{ height: width, width }, imageScale];
  const childrenStyles = [{ flex: 1 }, bleed];
  const backgroundColorStyles = [
    StyleSheet.absoluteFill,
    { backgroundColor },
    fade,
  ];
  const styles = StyleSheet.create({
    centered: { alignItems: 'center', flex: 1, justifyContent: 'center' },
    container: { backgroundColor, flex: 1 },
    flex: { flex: 1 },
  });

  useEffect(() => {
    Animated.timing(state.progress, {
      delay,
      duration,
      easing: Easing.in(Easing.cubic),
      toValue: 100,
      useNativeDriver,
    }).start(() => {
      setState((p) => ({ ...p, complete: true }));
    });
  }, [delay, duration, state.progress, useNativeDriver]);

  return (
    <View style={styles.container}>
      <Animated.View style={primaryColorStyles} />

      <MaskedView
        maskElement={
          <Animated.View style={styles.centered}>
            <Animated.Image
              source={source}
              style={imageStyles}
            />
          </Animated.View>
        }
        style={styles.flex}
      >
        <Animated.View style={backgroundColorStyles} />
        <Animated.View style={childrenStyles}>{children}</Animated.View>
      </MaskedView>
    </View>
  );
};
