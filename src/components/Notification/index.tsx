import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, PanResponder, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDriver } from '../../features/Animation';
import { padding } from '../../features/Config';
import { SoundManager } from '../../features/Sound';
import { useColor } from '../../features/Theme';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { TouchableOpacity } from '../TouchableOpacity';

type NotificationProps = {
  title: string;
  height?: number;
  dismissDelay?: number;
  thresholdPercent?: number;
  noSwipe?: boolean;
  onCancel?: () => void;
  onBackgroundPress?: () => void;
};

export const Notification = memo(function Notification({
  title,
  height = padding(18),
  thresholdPercent = 0.9,
  dismissDelay = 100,
  noSwipe,
  onCancel,
  onBackgroundPress,
}: NotificationProps) {
  const color = useColor();
  const initialPosition = useMemo(() => ({ x: 0, y: -height }), [height]);
  const styles = StyleSheet.create({
    container: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    flex: { flex: 1 },
    modal: {
      alignItems: 'center',
      backgroundColor: color.background.primaryA,
      flexDirection: 'row',
      height,
      padding: padding(4),
      width: '100%',
    },
    notification: { elevation: 2, zIndex: 2 },
    notificationSafeArea: {
      backgroundColor: color.background.primaryA,
      height,
      position: 'absolute',
      width: '100%',
    },
    overlay: {
      height: '100%',
      position: 'absolute',
      width: '100%',
    },
  });
  const useNativeDriver = useDriver();
  const pan = useRef(new Animated.ValueXY(initialPosition)).current;

  useEffect(() => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver,
    }).start();
  }, [height, onCancel, pan, useNativeDriver]);

  const onPanResponderRelease = useCallback(
    (_, g) => {
      if (noSwipe) return;

      const min = thresholdPercent * height * -1;
      const success = g.dy < min;
      const toValue = success ? { x: 0, y: -height * 2 } : initialPosition;
      Animated.spring(pan, {
        toValue,
        useNativeDriver,
      }).start();
      if (!success) return;

      setTimeout(() => {
        SoundManager.play('tap');
        if (onBackgroundPress) onBackgroundPress();
        else if (onCancel) onCancel();
      }, dismissDelay);
    },
    [
      dismissDelay,
      height,
      initialPosition,
      noSwipe,
      onBackgroundPress,
      onCancel,
      pan,
      thresholdPercent,
      useNativeDriver,
    ],
  );

  const onPanResponderMove = useCallback(
    (_, g) => {
      if (g.dy > 0 || noSwipe) return;

      const toValue = { x: 0, y: g.dy };
      Animated.spring(pan, {
        toValue,
        useNativeDriver,
      }).start();
    },
    [noSwipe, pan, useNativeDriver],
  );

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove,
      onPanResponderRelease,
    }),
  ).current;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <View style={styles.container} {...panResponder.panHandlers}>
      <Animated.View style={[pan.getLayout(), styles.notification]}>
        <View style={styles.notificationSafeArea} />
        <SafeAreaView>
          <View style={styles.modal}>
            <Icon color="primaryA" hidden name="close" size={padding(8)} />
            <Text center style={styles.flex} title={title} type="h4" />
            <TouchableOpacity onPress={onCancel}>
              <Icon name="close" size={padding(8)} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>
      {/* <TouchableOpacity
        disabled={!onBackgroundPress} // containerStyle?
        onPress={onBackgroundPress}
        style={styles.overlay}
      /> */}
    </View>
  );
});
