import { StyleSheet } from 'react-native';
import {
  ColorTheme,
  FontEmphasis,
  MonoMultiColor,
  padding,
} from '../../features';

export const getButtonColor = (
  colors: ColorTheme,
  color: keyof MonoMultiColor,
): string => colors.background[color];

type StyleInterface = {
  color: keyof MonoMultiColor;
  colors: ColorTheme;
  disabled?: boolean;
  emphasis: FontEmphasis;
  noPadding?: boolean;
};

export const getStyles = ({
  colors,
  color,
  emphasis,
  noPadding,
  disabled,
}: StyleInterface): any => {
  const backgroundColor =
    disabled && emphasis === 'high'
      ? colors.background.disabled
      : emphasis === 'high'
      ? colors.background[color]
      : emphasis === 'medium'
      ? colors.background.primaryA
      : 'transparent';

  const borderColor =
    disabled && emphasis === 'medium'
      ? colors.border.disabled
      : emphasis === 'medium'
      ? colors.border[color]
      : 'transparent';

  const textColor = disabled
    ? colors.text.disabled
    : emphasis === 'high' &&
      ['primaryA', 'secondary', 'tertiary'].some((c) => c === color)
    ? colors.text.primaryA
    : emphasis !== 'high' && ['primaryB'].some((c) => c === color)
    ? colors.text.primaryA
    : emphasis === 'high'
    ? colors.text.primaryB
    : colors.text[color];

  return StyleSheet.create({
    center: {
      justifyContent: 'center',
    },
    container: {
      backgroundColor,
      borderColor,
      borderRadius: padding(1),
      borderWidth: 1,
      flexDirection: 'row',
      padding: noPadding ? padding(0) : padding(2),
      paddingHorizontal: noPadding ? padding(0) : padding(4),
    },
    invisible: {
      opacity: 0,
    },
    right: {
      alignSelf: 'flex-end',
    },
    text: {
      color: textColor,
    },
  });
};
