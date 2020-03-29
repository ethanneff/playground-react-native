import React, {memo, useCallback} from 'react';
import {TouchableOpacity as Original, ViewStyle, StyleProp} from 'react-native';
import {Sound} from '../../conversions';

interface Props {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number;
  disabled?: boolean;
  onPress?(): void;
  onLongPress?(): void;
}

const sound = new Sound(require('./tap.mp3'));
export const TouchableOpacity: React.FC<Props> = memo(
  ({
    testID,
    onPress,
    onLongPress,
    children,
    disabled,
    activeOpacity,
    style,
  }) => {
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
  },
);
