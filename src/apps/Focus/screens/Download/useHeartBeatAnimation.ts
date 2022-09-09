import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useDriver } from '../../../../features';

// TODO: move to storybook
export const useHeartBeatAnimation = () => {
  const useNativeDriver = useDriver();
  const loadingAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingAnimation, {
          duration: 500,
          toValue: 1.1,
          useNativeDriver,
        }),
        Animated.timing(loadingAnimation, {
          duration: 500,
          toValue: 1,
          useNativeDriver,
        }),
      ]),
    ).start();
  }, [loadingAnimation, useNativeDriver]);

  return { transform: [{ scale: loadingAnimation }] };
};
