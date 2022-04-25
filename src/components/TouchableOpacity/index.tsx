import React, { ReactElement, ReactNode, useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { GestureTouchableOpacity } from '../../conversions';
import { SoundManager } from '../../features';

type Props = {
  activeOpacity?: number;
  children?: ReactNode | ReactNode[];
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  flex?: boolean;
  onLongPress?(): void;
  onPress?(): void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export const TouchableOpacity = ({
  testID,
  onPress,
  onLongPress,
  children,
  disabled,
  activeOpacity,
  containerStyle,
  flex,
  style,
}: Props): ReactElement => {
  const onPressHandler = useCallback(() => {
    SoundManager.play('tap');
    if (onPress) onPress();
  }, [onPress]);

  const onLongPressHandler = useCallback(() => {
    SoundManager.play('tap');
    if (onLongPress) onLongPress();
  }, [onLongPress]);

  const styles = [{ flex: flex ? 1 : 0 }, style];
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
      {children}
    </GestureTouchableOpacity>
  );
};
