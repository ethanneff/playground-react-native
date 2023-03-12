import React, { type ReactNode, useCallback } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { GestureTouchableOpacity } from '../../conversions';
import { SoundManager } from '../../features';
import { View } from '../View';

type Props = {
  activeOpacity?: number;
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  flex?: boolean;
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
  onLongPress,
  onPress,
  style,
  testID,
}: Props) => {
  const onPressHandler = useCallback(() => {
    SoundManager.play('tap');
    if (onPress) onPress();
  }, [onPress]);

  const onLongPressHandler = useCallback(() => {
    SoundManager.play('tap');
    if (onLongPress) onLongPress();
  }, [onLongPress]);

  const styles = [{ flex: flex ? 1 : undefined }, style];
  return (
    <GestureTouchableOpacity
      activeOpacity={activeOpacity}
      containerStyle={containerStyle}
      disabled={disabled}
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
