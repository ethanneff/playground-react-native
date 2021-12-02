import React, { memo } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { FontEmphasis, MonoMultiColor } from '../../features/Config';
import { useColor, useDropShadow } from '../../features/Theme';
import { Text } from '../Text';
import { TouchableOpacity } from '../TouchableOpacity';
import { getStyles } from './utils';

/*
styling: https://material.io/design/components/buttons.html#usage
*/

type Props = {
  activeOpacity?: number;
  /* styling */
  buttonStyle?: StyleProp<ViewStyle>;
  center?: boolean;
  color?: keyof MonoMultiColor;
  disabled?: boolean;
  dropShadow?: boolean;
  elevation?: number;
  /* color */
  emphasis?: FontEmphasis;
  /* state */
  hidden?: boolean;
  invisible?: boolean;
  lowercase?: boolean;
  /* size */
  noPadding?: boolean;
  onLongPress?(): void;
  /* event */
  onPress?(): void;
  right?: boolean;
  testID?: string;
  textStyle?: StyleProp<TextStyle>;
  /* content */
  title: string;
};

export const Button = memo(function Button({
  activeOpacity,
  buttonStyle,
  center,
  disabled,
  noPadding,
  dropShadow,
  elevation = 2,
  hidden,
  invisible,
  testID,
  emphasis = 'low',
  lowercase,
  onPress,
  color = 'primaryA',
  onLongPress,
  right,
  textStyle,
  title,
}: Props) {
  const colorScheme = useColor();
  const dropShadowStyling = useDropShadow();
  const styles = getStyles({
    colorScheme,
    color,
    emphasis,
    disabled,
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
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={disabled || invisible}
      onLongPress={onLongPress}
      onPress={onPress}
      style={buttonStyleGroup}
      testID={testID}
    >
      <Text
        center
        style={textStyleGroup}
        title={title}
        type={lowercase ? undefined : 'button'}
      />
    </TouchableOpacity>
  );
});
