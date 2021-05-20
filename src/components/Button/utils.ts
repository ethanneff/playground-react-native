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
  color: string;
  emphasis: ButtonEmphasis;
  noPadding?: boolean;
  disable?: boolean;
}

export const getStyles = ({
  colorScheme,
  color,
  emphasis,
  noPadding,
  disable,
}: StyleInterface): any =>
  StyleSheet.create({
    center: {
      justifyContent: 'center',
    },
    container: {
      backgroundColor:
        disable && emphasis === 'high'
          ? colorScheme.background.disabled
          : emphasis === 'high'
          ? color
          : 'transparent',
      borderColor:
        disable && emphasis === 'medium'
          ? colorScheme.border.disabled
          : emphasis === 'medium'
          ? color
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
      color: disable
        ? colorScheme.text.disabled
        : emphasis === 'high'
        ? colorScheme.text.primaryB
        : color,
    },
  });
