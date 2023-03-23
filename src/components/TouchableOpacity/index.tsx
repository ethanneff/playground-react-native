import React, { useCallback, type ReactNode } from 'react';
import {
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { GestureTouchableOpacity } from '../../conversions';
import { SoundManager } from '../../features';
import { View } from '../View';

type Props = {
  activeOpacity?: number;
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  flex?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  onLongPress?: () => void;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export const TouchableOpacity = ({
  activeOpacity,
  children,
  containerStyle,
  disabled,
  flex,
  onLayout,
  onLongPress,
  onPress,
  style,
  testID,
}: Props) => {
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

  const styles = [{ flex: flex ? 1 : undefined }, style];
  return (
    <GestureTouchableOpacity
      activeOpacity={activeOpacity}
      containerStyle={containerStyle}
      disabled={disabled}
      onLayout={onLayout}
      onLongPress={onLongPressHandler}
      onPress={onPressHandler}
      style={styles}
      testID={testID}
    >
      <View
        accessibilityRole="button"
        accessible
      >
        {children}
      </View>
    </GestureTouchableOpacity>
  );
};
