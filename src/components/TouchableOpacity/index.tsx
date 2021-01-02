import React, {ReactNode, useCallback} from 'react';
import {StyleProp, TouchableOpacity as Original, ViewStyle} from 'react-native';
import {SoundManager} from '../../utils/Sound';

interface Props {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number;
  disabled?: boolean;
  onPress?(): void;
  onLongPress?(): void;
  children?: ReactNode | ReactNode[];
}

export const TouchableOpacity = ({
  testID,
  onPress,
  onLongPress,
  children,
  disabled,
  activeOpacity,
  style,
}: Props): JSX.Element => {
  const onPressHandler = useCallback(() => {
    SoundManager.play('tap');
    if (onPress) onPress();
  }, [onPress]);

  const onLongPressHandler = useCallback(() => {
    SoundManager.play('tap');
    if (onLongPress) onLongPress();
  }, [onLongPress]);

  return (
    <Original
      activeOpacity={activeOpacity}
      disabled={disabled}
      onLongPress={onLongPressHandler}
      onPress={onPressHandler}
      style={style}
      testID={testID}>
      {children}
    </Original>
  );
};
