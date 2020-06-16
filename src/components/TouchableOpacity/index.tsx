import React, {ReactNode, useCallback} from 'react';
import {TouchableOpacity as Original, StyleProp, ViewStyle} from 'react-native';
import {Sound} from '../../conversions';

interface Props {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number;
  disabled?: boolean;
  onPress?(): void;
  onLongPress?(): void;
  children?: ReactNode | ReactNode[];
}

const sound = new Sound(require('./tap.mp3'));
export const TouchableOpacity = ({
  testID,
  onPress,
  onLongPress,
  children,
  disabled,
  activeOpacity,
  style,
}: Props) => {
  const onPressHandler = useCallback(() => {
    sound.stop(() => sound.play());
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  const onLongPressHandler = useCallback(() => {
    sound.stop(() => sound.play());
    if (onLongPress) {
      onLongPress();
    }
  }, [onLongPress]);

  return (
    <Original
      testID={testID}
      activeOpacity={activeOpacity}
      disabled={disabled}
      onPress={onPressHandler}
      style={style}
      onLongPress={onLongPressHandler}>
      {children}
    </Original>
  );
};
