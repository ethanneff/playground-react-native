import React, {ReactNode, memo, useEffect, useState} from 'react';
import {
  Animated,
  Easing,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';
import {MaskedView} from '../../conversions';
import {useDriver} from '../../hooks';
import {getSmallestDimension} from '../../models';
import {useRootSelector} from '../../utils';

// TODO: convert to svg, remove mask, fade in and out

type Props = {
  backgroundColor: string;
  primaryColor: string;
  source: ImageSourcePropType;
  duration?: number;
  delay?: number;
  children: ReactNode;
};

const getInterpolate = (progress: Animated.Value) => ({
  bleed: {
    opacity: progress.interpolate({
      inputRange: [0, 25, 50],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    }),
  },
  fade: {
    opacity: progress.interpolate({
      inputRange: [0, 25, 75],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
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

export const SplashScreen = memo(
  ({
    backgroundColor,
    primaryColor,
    source,
    duration = 1000,
    delay = 300,
    children,
  }: Props) => {
    const smallest = useRootSelector(getSmallestDimension);
    const useNativeDriver = useDriver();
    const [state, setState] = useState({
      progress: new Animated.Value(0),
      complete: false,
    });
    const width = smallest * 4;
    const {imageScale, fade, bleed} = getInterpolate(state.progress);
    const primaryColorStyles = [
      StyleSheet.absoluteFill,
      {backgroundColor: primaryColor},
      fade,
    ];
    const imageStyles = [{width, height: width}, imageScale];
    const childrenStyles = [{flex: 1}, bleed];
    const backgroundColorStyles = [
      StyleSheet.absoluteFill,
      {backgroundColor},
      fade,
    ];
    const styles = StyleSheet.create({
      centered: {alignItems: 'center', flex: 1, justifyContent: 'center'},
      container: {backgroundColor, flex: 1},
      flex: {flex: 1},
    });

    useEffect(() => {
      Animated.timing(state.progress, {
        toValue: 100,
        duration,
        useNativeDriver,
        delay,
        easing: Easing.in(Easing.cubic),
      }).start(() => setState(p => ({...p, complete: true})));
    }, [delay, duration, state.progress, useNativeDriver]);

    return (
      <View style={styles.container}>
        <Animated.View style={primaryColorStyles} />
        <MaskedView
          maskElement={
            <Animated.View style={styles.centered}>
              <Animated.Image source={source} style={imageStyles} />
            </Animated.View>
          }
          style={styles.flex}>
          <Animated.View style={backgroundColorStyles} />
          <Animated.View style={childrenStyles}>{children}</Animated.View>
        </MaskedView>
      </View>
    );
  },
);
