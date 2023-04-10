import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useColors, useDriver } from '../../features';
import { Pressable } from '../Pressable';
import { Loader, Spinner } from '../Spinner';

type Props = {
  onBackgroundPress?: () => void;
};

export const Loading = memo(function LoadingScreen({
  onBackgroundPress,
}: Props) {
  const colors = useColors();
  const useNativeDriver = useDriver();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(opacity, {
      toValue: 1,
      useNativeDriver,
    }).start();
  }, [opacity, useNativeDriver]);

  const onPress = useCallback(() => {
    if (!onBackgroundPress) return;
    Animated.spring(opacity, {
      toValue: 0,
      useNativeDriver,
    }).start(() => {
      onBackgroundPress();
    });
  }, [opacity, onBackgroundPress, useNativeDriver]);

  return (
    <Animated.View
      style={{
        backgroundColor: colors.overlay.dark,
        bottom: 0,
        left: 0,
        opacity,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
      }}
    >
      <Pressable
        containerStyle={{ flex: 1, justifyContent: 'center' }}
        disabled={!onBackgroundPress}
        onPress={onPress}
      >
        <Spinner
          color="primaryB"
          size="large"
        />
      </Pressable>
    </Animated.View>
  );
});
