import React from 'react';
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

type Properties = {
  /* styling */
  readonly buttonStyle?: StyleProp<ViewStyle>;
  readonly center?: boolean;
  readonly color?: keyof MonoMultiColor;
  readonly disabled?: boolean;
  readonly dropShadow?: boolean;
  readonly elevation?: number;
  /* shape */
  readonly emphasis?: FontEmphasis;
  /* state */
  readonly hidden?: boolean;
  readonly invisible?: boolean;
  readonly lowercase?: boolean;
  /* size */
  readonly noPadding?: boolean;
  readonly onLongPress?: () => void;
  /* event */
  readonly onPress: () => void;
  readonly right?: boolean;
  readonly testID?: string;
  readonly textStyle?: StyleProp<TextStyle>;
  /* content */
  readonly title: string;
};

export const Button = ({
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
}: Properties) => {
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
};
