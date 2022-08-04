import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useDriver } from '../../../../features';

export const useHeartBeatAnimation = () => {
  const useNativeDriver = useDriver();
  const loadingAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingAnimation, {
          toValue: 1.1,
          useNativeDriver,
          duration: 500,
        }),
        Animated.timing(loadingAnimation, {
          toValue: 1,
          useNativeDriver,
          duration: 500,
        }),
      ]),
    ).start();
  }, [loadingAnimation, useNativeDriver]);

  return { transform: [{ scale: loadingAnimation }] };
};
