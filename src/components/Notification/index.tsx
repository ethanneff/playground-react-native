import React, {memo, useCallback, useRef} from 'react';
import {Animated, PanResponder, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useColor, useDriver} from '../../hooks';
import {config} from '../../utils';
import {SoundManager} from '../../utils/Sound';
import {Icon} from '../Icon';
import {Text} from '../Text';
import {TouchableOpacity} from '../TouchableOpacity';

type NotificationProps = {
  title: string;
  height?: number;
  dismissDelay?: number;
  thresholdPercent?: number;
  noSwipe?: boolean;
  onCancel?: () => void;
  onBackgroundPress?: () => void;
};

const initialPosition = {x: 0, y: 0};
export const Notification = memo(function Notification({
  title,
  height = config.padding(18),
  thresholdPercent = 0.9,
  dismissDelay = 100,
  noSwipe,
  onCancel,
  onBackgroundPress,
}: NotificationProps) {
  const color = useColor();
  const styles = StyleSheet.create({
    flex: {flex: 1},
    modal: {
      alignItems: 'center',
      backgroundColor: color.background,
      flexDirection: 'row',
      height,
      padding: config.padding(4),
      width: '100%',
    },
    notification: {elevation: 2, zIndex: 2},
    notificationSafeArea: {
      backgroundColor: color.background,
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

  const pan = useRef(new Animated.ValueXY(initialPosition)).current;
  const useNativeDriver = useDriver();

  const onPanResponderRelease = useCallback(
    (_, g) => {
      if (noSwipe) return;

      const min = thresholdPercent * height * -1;
      const success = g.dy < min;
      const toValue = success ? {x: 0, y: -height * 2} : initialPosition;
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
    (_, g) => {
      if (g.dy > 0 || noSwipe) return;

      const toValue = {x: 0, y: g.dy};
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
    <View style={styles.flex} {...panResponder.panHandlers}>
      <Animated.View style={[pan.getLayout(), styles.notification]}>
        <View style={styles.notificationSafeArea} />
        <SafeAreaView>
          <View style={styles.modal}>
            <Icon
              color={color.background}
              name="close"
              size={config.padding(8)}
            />
            <Text center style={styles.flex} title={title} type="h4" />
            <Icon name="close" onPress={onCancel} size={config.padding(8)} />
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
