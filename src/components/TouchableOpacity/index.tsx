import React, { ReactElement, ReactNode, useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity as Original } from '../../conversions';
import { SoundManager } from '../../features/Sound';

type Props = {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  flex?: boolean;
  activeOpacity?: number;
  disabled?: boolean;
  onPress?(): void;
  onLongPress?(): void;
  children?: ReactNode | ReactNode[];
};

export const TouchableOpacity = ({
  testID,
  onPress,
  onLongPress,
  children,
  disabled,
  activeOpacity,
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
    <Original
      activeOpacity={activeOpacity}
      disabled={disabled}
      onLongPress={onLongPressHandler}
      onPress={onPressHandler}
      style={styles}
      testID={testID}
    >
      {children}
    </Original>
  );
};
