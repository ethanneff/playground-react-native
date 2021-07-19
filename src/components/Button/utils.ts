import {StyleSheet} from 'react-native';
import {padding} from './../../utils/Config/index';
import {ColorTheme, MonoMultiColor} from './../../utils/Config/types';
import {ButtonEmphasis} from './types';

export const getButtonColor = (
  colorScheme: ColorTheme,
  color: keyof MonoMultiColor,
): string => colorScheme.background[color];

interface StyleInterface {
  colorScheme: ColorTheme;
  color: keyof MonoMultiColor;
  emphasis: ButtonEmphasis;
  noPadding?: boolean;
  disabled?: boolean;
}

export const getStyles = ({
  colorScheme,
  color,
  emphasis,
  noPadding,
  disabled,
}: StyleInterface): any =>
  StyleSheet.create({
    center: {
      justifyContent: 'center',
    },
    container: {
      backgroundColor:
        disabled && emphasis === 'high'
          ? colorScheme.background.disabled
          : emphasis === 'high'
          ? colorScheme.background[color]
          : emphasis === 'medium'
          ? colorScheme.background.primaryA
          : 'transparent',
      borderColor:
        disabled && emphasis === 'medium'
          ? colorScheme.border.disabled
          : emphasis === 'medium'
          ? colorScheme.border[color]
          : 'transparent',
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
      color: disabled
        ? colorScheme.text.disabled
        : emphasis === 'high' &&
          ['primaryA', 'secondary', 'tertiary'].some(c => c === color)
        ? colorScheme.text.primaryA
        : emphasis !== 'high' && ['primaryB'].some(c => c === color)
        ? colorScheme.text.primaryA
        : emphasis === 'high'
        ? colorScheme.text.primaryB
        : colorScheme.text[color],
    },
  });
