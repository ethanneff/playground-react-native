import { StyleSheet } from 'react-native';
import {
  spacing,
  type ColorTheme,
  type FontEmphasis,
  type MonoMultiColor,
} from '../../features';

type StyleInterface = {
  color: keyof MonoMultiColor;
  colors: ColorTheme;
  disabled?: boolean;
  emphasis: FontEmphasis;
  noPadding?: boolean;
};

export const getStyles = ({
  color,
  colors,
  disabled,
  emphasis,
  noPadding,
}: StyleInterface) => {
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
        ['primaryA', 'secondary', 'tertiary'].includes(color)
      ? colors.text.primaryA
      : emphasis !== 'high' && ['primaryB'].includes(color)
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
      borderRadius: spacing(1),
      borderWidth: 1,
      flexDirection: 'row',
      padding: noPadding ? spacing(0) : spacing(2),
      paddingHorizontal: noPadding ? spacing(0) : spacing(4),
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
