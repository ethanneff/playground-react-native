import React, { memo, useCallback, useRef } from 'react';
import {
  Animated,
  type GestureResponderEvent,
  PanResponder,
  type PanResponderGestureState,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from '../../components';
import { SoundManager, spacing, useColors, useDriver } from '../../features';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { TouchableOpacity } from '../TouchableOpacity';

type NotificationProps = {
  dismissDelay?: number;
  height?: number;
  noSwipe?: boolean;
  onBackgroundPress?: () => void;
  onCancel?: () => void;
  thresholdPercent?: number;
  title: string;
};

const initialPosition = { x: 0, y: 0 };
export const ActionSheet = memo(function ActionSheet({
  dismissDelay = 100,
  height = spacing(18),
  noSwipe,
  onBackgroundPress,
  onCancel,
  thresholdPercent = 0.9,
  title,
}: NotificationProps) {
  const colors = useColors();
  const styles = StyleSheet.create({
    flex: { flex: 1 },
    modal: {
      alignItems: 'center',
      backgroundColor: colors.background.primaryA,
      flexDirection: 'row',
      height,
      padding: spacing(4),
      width: '100%',
    },
    notification: { elevation: 2, zIndex: 2 },
    notificationSafeArea: {
      backgroundColor: colors.background.primaryA,
      height,
      position: 'absolute',
      width: '100%',
    },
    overlay: {
      height: '100%',
      position: 'absolute',
      width: '100%',
    },
    top: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
  });

  const pan = useRef(new Animated.ValueXY(initialPosition)).current;
  const useNativeDriver = useDriver();

  const onPanResponderRelease = useCallback(
    (_: GestureResponderEvent, g: PanResponderGestureState) => {
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
      noSwipe,
      onBackgroundPress,
      onCancel,
      pan,
      thresholdPercent,
      useNativeDriver,
    ],
  );

  const onPanResponderMove = useCallback(
    (_: GestureResponderEvent, g: PanResponderGestureState) => {
      if (g.dy > 0 || noSwipe) return;

      const toValue = { x: 0, y: g.dy };
      Animated.spring(pan, {
        toValue,
        useNativeDriver,
      }).start();
    },
    [noSwipe, pan, useNativeDriver],
  );

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove,
      onPanResponderRelease,
    }),
  ).current;

  return (
    <View
      style={styles.top}
      {...panResponder.panHandlers} // eslint-disable-line react/jsx-props-no-spreading
    >
      <Animated.View style={[pan.getLayout(), styles.notification]}>
        <View style={styles.notificationSafeArea} />
        <SafeAreaView>
          <View style={styles.modal}>
            <Icon
              color="primaryA"
              hidden
              name="close"
              size={spacing(8)}
            />
            <Text
              center
              style={styles.flex}
              title={title}
              type="h4"
            />
            <TouchableOpacity onPress={onCancel}>
              <Icon
                name="close"
                size={spacing(8)}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>
      <TouchableOpacity
        disabled={!onBackgroundPress}
        onPress={onBackgroundPress}
        style={styles.overlay}
      />
    </View>
  );
});
