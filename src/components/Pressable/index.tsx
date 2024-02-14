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

type Properties = {
  readonly accessibilityLabel?: string;
  readonly accessible?: boolean;
  readonly children?: ReactNode;
  readonly containerStyle?: StyleProp<ViewStyle>;
  readonly contentStyle?: StyleProp<ViewStyle>;
  readonly disabled?: boolean;
  readonly onLayout?: (event: LayoutChangeEvent) => void;
  readonly onLongPress?: () => void;
  readonly onPress?: () => void;
  readonly onPressIn?: () => void;
  readonly onPressOut?: () => void;
  readonly testID?: string;
  readonly withoutFeedback?: boolean;
};

export const Pressable = ({
  accessibilityLabel,
  accessible,
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
}: Properties) => {
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
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessible={accessible}
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
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessible={accessible}
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
