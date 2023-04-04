import React, { useCallback, type ReactNode } from 'react';
import {
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {
  GestureTouchableOpacity,
  GestureTouchableWithoutFeedback,
} from '../../conversions';
import { SoundManager } from '../../features';

type Props = {
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  onLongPress?: () => void;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  testID?: string;
  withoutFeedback?: boolean;
};

export const Pressable = ({
  children,
  containerStyle,
  contentStyle,
  disabled,
  onLayout,
  onLongPress,
  onPress,
  onPressIn,
  onPressOut,
  testID,
  withoutFeedback,
}: Props) => {
  const onPressInHandler = useCallback(() => {
    if (!onPressIn) return;
    SoundManager.play('tap');
    onPressIn();
  }, [onPressIn]);

  const onPressOutHandler = useCallback(() => {
    if (!onPressOut) return;
    SoundManager.play('tap');
    onPressOut();
  }, [onPressOut]);

  const onPressHandler = useCallback(() => {
    if (!onPress) return;
    SoundManager.play('tap');
    onPress();
  }, [onPress]);

  const onLongPressHandler = useCallback(() => {
    if (!onLongPress) return;
    SoundManager.play('tap');
    onLongPress();
  }, [onLongPress]);

  return withoutFeedback ? (
    <GestureTouchableWithoutFeedback
      accessibilityRole="button"
      accessible
      containerStyle={containerStyle}
      disabled={disabled}
      onLayout={onLayout}
      onLongPress={onLongPressHandler}
      onPress={onPressHandler}
      onPressIn={onPressInHandler}
      onPressOut={onPressOutHandler}
      style={contentStyle}
      testID={testID}
    >
      {children}
    </GestureTouchableWithoutFeedback>
  ) : (
    <GestureTouchableOpacity
      accessibilityRole="button"
      accessible
      containerStyle={containerStyle}
      disabled={disabled}
      onLayout={onLayout}
      onLongPress={onLongPressHandler}
      onPress={onPressHandler}
      onPressIn={onPressInHandler}
      onPressOut={onPressOutHandler}
      style={contentStyle}
      testID={testID}
    >
      {children}
    </GestureTouchableOpacity>
  );
};
