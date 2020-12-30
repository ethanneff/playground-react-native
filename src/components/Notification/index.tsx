import React, {memo, useCallback, useRef} from 'react';
import {Animated, PanResponder, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useColor, useDriver} from '../../hooks';
import {Theme} from '../../utils';
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
  height = Theme.padding.p18,
  thresholdPercent = 0.9,
  dismissDelay = 100,
  noSwipe,
  onCancel,
  onBackgroundPress,
}: NotificationProps) {
  const color = useColor();
  const styles = StyleSheet.create({
    modal: {
      alignItems: 'center',
      backgroundColor: color.background,
      flexDirection: 'row',
      height,
      justifyContent: 'flex-end',
      padding: Theme.padding.p04,
      width: '100%',
    },
    notification: {zIndex: 2},
    notificationSafeArea: {
      backgroundColor: color.background,
      height,
      position: 'absolute',
      width: '100%',
      zIndex: 1,
    },
    overlay: {
      height: '100%',
      position: 'absolute',
      width: '100%',
    },
    title: {flex: 1},
  });

  const pan = useRef(new Animated.ValueXY(initialPosition)).current;
  const useNativeDriver = useDriver();

  const onPanResponderRelease = useCallback(
    (_, g) => {
      if (noSwipe) {
        return;
      }
      const min = thresholdPercent * height * -1;
      const success = g.dy < min;
      const toValue = success ? {x: 0, y: -height * 2} : initialPosition;
      Animated.spring(pan, {
        toValue,
        useNativeDriver,
      }).start();
      if (success) {
        setTimeout(() => {
          if (onBackgroundPress) {
            onBackgroundPress();
          } else if (onCancel) {
            onCancel();
          }
        }, dismissDelay);
      }
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
      if (g.dy > 0 || noSwipe) {
        return;
      }
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
    <View style={{flex: 1}} {...panResponder.panHandlers}>
      <Animated.View style={pan.getLayout()}>
        <View style={styles.notificationSafeArea} />
        <SafeAreaView style={styles.notification}>
          <Animated.View style={styles.modal}>
            <Icon
              color={color.background}
              name="close"
              size={Theme.padding.p08}
            />
            <Text center style={styles.title} title={title} type="h3" />
            <Icon name="close" onPress={onCancel} size={Theme.padding.p08} />
          </Animated.View>
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
