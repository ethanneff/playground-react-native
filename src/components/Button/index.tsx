import React from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {Text} from '../Text';
import {TouchableOpacity} from '../TouchableOpacity';
import {useColor, useDropShadow} from '../../hooks';
import {Color} from '../../models';
import {getStyles} from './utils';

/*
styling: https://material.io/design/components/buttons.html#usage
*/

export type ButtonEmphasis = 'low' | 'medium' | 'high';

interface Props {
  /* content */
  title: string;
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

export const Button = ({
  activeOpacity,
  buttonStyle,
  center,
  disable,
  noPadding,
  dropShadow,
  elevation = 2,
  hidden,
  invisible,
  emphasis = 'low',
  lowercase,
  onPress,
  color = 'text',
  onLongPress,
  right,
  textStyle,
  title,
}: Props) => {
  const colorScheme = useColor();
  const dropShadowStyling = useDropShadow(elevation);
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
    dropShadow && dropShadowStyling,
    invisible && styles.invisible,
    buttonStyle,
  ];
  const textStyleGroup = [styles.text, textStyle];

  return hidden ? null : (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={disable || invisible}
      onLongPress={onLongPress}
      onPress={onPress}
      style={buttonStyleGroup}>
      <Text
        center
        style={textStyleGroup}
        title={title}
        type={!lowercase ? 'button' : undefined}
      />
    </TouchableOpacity>
  );
};
