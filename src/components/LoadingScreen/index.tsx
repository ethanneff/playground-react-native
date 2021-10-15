import React, { memo, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated } from 'react-native';
import { useDriver } from '../../features/Animation';
import { useColor } from '../../features/Theme';
import { useRootSelector } from '../../redux';
import { TouchableOpacity } from '../TouchableOpacity';

const duration = 250;

export const LoadingScreen = memo(function LoadingScreen() {
  const [show, setShow] = useState(false);
  const { visible, onBackgroundPress } = useRootSelector(
    (state) => state.ui.loading,
  );
  const color = useColor();
  const useNativeDriver = useDriver();
  const location = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) setShow(visible);
    const toValue = visible ? 1 : 0;
    const config = { toValue, duration, useNativeDriver };
    Animated.timing(location, config).start(() => setShow(visible));
  }, [location, useNativeDriver, visible]);

  return show ? (
    <Animated.View
      style={{
        opacity: location,
        zIndex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: color.overlay.dark,
      }}
    >
      <TouchableOpacity
        containerStyle={{ flex: 1, justifyContent: 'center' }}
        disabled={!onBackgroundPress}
        onPress={onBackgroundPress}
      >
        <ActivityIndicator color={color.background.primaryA} size="large" />
      </TouchableOpacity>
    </Animated.View>
  ) : null;
});
