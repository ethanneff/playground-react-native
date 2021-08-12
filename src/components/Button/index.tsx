import React, {memo} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {MonoMultiColor} from '../../features/Config';
import {useColor, useDropShadow} from '../../features/Theme';
import {Text} from '../Text';
import {TouchableOpacity} from '../TouchableOpacity';
import {ButtonEmphasis} from './types';
import {getStyles} from './utils';

/*
styling: https://material.io/design/components/buttons.html#usage
*/

type Props = {
  /* content */
  title: string;
  testID?: string;
  /* styling */
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  dropShadow?: boolean;
  elevation?: number;
  activeOpacity?: number;
  /* state */
  hidden?: boolean;
  disabled?: boolean;
  invisible?: boolean;
  /* color */
  emphasis?: ButtonEmphasis;
  color?: keyof MonoMultiColor;
  /* size */
  noPadding?: boolean;
  center?: boolean;
  right?: boolean;
  lowercase?: boolean;
  /* event */
  onPress?(): void;
  onLongPress?(): void;
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

  return hidden ? (
    <></>
  ) : (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={disabled || invisible}
      onLongPress={onLongPress}
      onPress={onPress}
      style={buttonStyleGroup}
      testID={testID}>
      <Text
        center
        style={textStyleGroup}
        title={title}
        type={!lowercase ? 'button' : undefined}
      />
    </TouchableOpacity>
  );
});
