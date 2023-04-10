import React, { memo } from 'react';
import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import {
  useColors,
  useDropShadow,
  type FontEmphasis,
  type MonoMultiColor,
} from '../../features';
import { Pressable } from '../Pressable';
import { Spinner } from '../Spinner';
import { Text } from '../Text';
import { getStyles } from './utils';

/*
styling: https://material.io/design/components/buttons.html#usage
*/

type Props = {
  buttonStyle?: StyleProp<ViewStyle>;
  center?: boolean;
  color?: keyof MonoMultiColor;
  disabled?: boolean;
  dropShadow?: boolean;
  elevation?: number;
  emphasis?: FontEmphasis;
  hidden?: boolean;
  invisible?: boolean;
  loading?: boolean;
  lowercase?: boolean;
  noPadding?: boolean;
  onLongPress?: () => void;
  onPress: () => void;
  right?: boolean;
  testID?: string;
  textStyle?: StyleProp<TextStyle>;
  title: string;
};

export const Button = memo(function Button({
  buttonStyle,
  center,
  color = 'primaryA',
  disabled,
  dropShadow,
  elevation = 2,
  emphasis = 'low',
  hidden,
  invisible,
  loading,
  lowercase,
  noPadding,
  onLongPress,
  onPress,
  right,
  testID,
  textStyle,
  title,
}: Props) {
  const colors = useColors();
  const dropShadowStyling = useDropShadow();
  const styles = getStyles({
    color,
    colors,
    disabled,
    emphasis,
    noPadding,
  });
  const buttonStyleGroup = [
    styles.container,
    center && styles.center,
    right && styles.right,
    dropShadow && dropShadowStyling(elevation),
    invisible && styles.invisible,
    buttonStyle,
  ];
  const textStyleGroup = [styles.text, textStyle];

  return hidden ? null : (
    <Pressable
      containerStyle={buttonStyleGroup}
      disabled={disabled ?? invisible ?? loading}
      onLongPress={onLongPress}
      onPress={onPress}
      testID={testID}
    >
      <Text
        center
        invisible={loading}
        style={textStyleGroup}
        title={title}
        type={lowercase ? undefined : 'button'}
      />
      {loading ? (
        <Spinner
          size={1}
          style={{
            alignItems: 'center',
            height: '100%',
            position: 'absolute',
            width: '100%',
          }}
        />
      ) : null}
    </Pressable>
  );
});
