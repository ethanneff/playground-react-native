import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useColors, useDriver } from '../../features';
import { Loader } from '../Loader';
import { TouchableOpacity } from '../TouchableOpacity';

type Props = {
  duration?: number;
  onBackgroundPress: () => void;
};

export const Loading = memo(function LoadingScreen({
  onBackgroundPress,
  duration = 250,
}: Props) {
  const colors = useColors();
  const useNativeDriver = useDriver();
  const location = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(location, {
      toValue: 1,
      duration,
      useNativeDriver,
    }).start();
  }, [duration, location, useNativeDriver]);

  const onPress = useCallback(() => {
    if (!onBackgroundPress) return;
    Animated.timing(location, {
      toValue: 0,
      duration,
      useNativeDriver,
    }).start(() => onBackgroundPress());
  }, [duration, location, onBackgroundPress, useNativeDriver]);

  return (
    <Animated.View
      style={{
        opacity: location,
        zIndex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: colors.overlay.dark,
      }}
    >
      <TouchableOpacity
        containerStyle={{ flex: 1, justifyContent: 'center' }}
        disabled={!onBackgroundPress}
        onPress={onPress}
      >
        <Loader color="primaryA" size="large" />
      </TouchableOpacity>
    </Animated.View>
  );
});
