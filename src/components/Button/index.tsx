import React, { memo } from 'react';
import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import {
  useColors,
  useDropShadow,
  type FontEmphasis,
  type MonoMultiColor,
} from '../../features';
import { Pressable } from '../Pressable';
import { Text } from '../Text';
import { getStyles } from './utils';

/*
styling: https://material.io/design/components/buttons.html#usage
*/

type Props = {
  /* styling */
  buttonStyle?: StyleProp<ViewStyle>;
  center?: boolean;
  color?: keyof MonoMultiColor;
  disabled?: boolean;
  dropShadow?: boolean;
  elevation?: number;
  /* shape */
  emphasis?: FontEmphasis;
  /* state */
  hidden?: boolean;
  invisible?: boolean;
  lowercase?: boolean;
  /* size */
  noPadding?: boolean;
  onLongPress?: () => void;
  /* event */
  onPress: () => void;
  right?: boolean;
  testID?: string;
  textStyle?: StyleProp<TextStyle>;
  /* content */
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
      accessibilityLabel={title}
      containerStyle={buttonStyleGroup}
      disabled={disabled ?? invisible}
      onLongPress={onLongPress}
      onPress={onPress}
      testID={testID}
    >
      <Text
        center
        style={textStyleGroup}
        title={title}
        type={lowercase ? undefined : 'button'}
      />
    </Pressable>
  );
});
