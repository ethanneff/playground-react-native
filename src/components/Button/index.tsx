import React, {memo} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {useColor, useDropShadow} from '../../hooks';
import {Color} from '../../models';
import {Text} from '../Text';
import {TouchableOpacity} from '../TouchableOpacity';
import {ButtonEmphasis} from './types';
import {getStyles} from './utils';

/*
styling: https://material.io/design/components/buttons.html#usage
*/

interface Props {
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
  disable?: boolean;
  invisible?: boolean;
  /* color */
  emphasis?: ButtonEmphasis;
  color?: keyof Color;
  /* size */
  noPadding?: boolean;
  center?: boolean;
  right?: boolean;
  lowercase?: boolean;
  /* event */
  onPress?(): void;
  onLongPress?(): void;
}

export const Button = memo(function Button({
  activeOpacity,
  buttonStyle,
  center,
  disable,
  noPadding,
  dropShadow,
  elevation = 2,
  hidden,
  invisible,
  testID,
  emphasis = 'low',
  lowercase,
  onPress,
  color = 'text',
  onLongPress,
  right,
  textStyle,
  title,
}: Props) {
  const colorScheme = useColor();
  const dropShadowStyling = useDropShadow();
  const buttonColor = colorScheme[color || 'text'];
  const styles = getStyles({
    colorScheme,
    color: buttonColor,
    emphasis,
    disable,
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
      disabled={disable || invisible}
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
