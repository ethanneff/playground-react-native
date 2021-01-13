import {StyleSheet} from 'react-native';
import {Color} from './../../models/Theme';
import {config, getDisabledColor} from './../../utils/Config/index';
import {ButtonEmphasis} from './types';

export const getButtonColor = (
  colorScheme: Color,
  color: keyof Color,
): string => colorScheme[color];

interface StyleInterface {
  colorScheme: Color;
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
          ? getDisabledColor(color)
          : emphasis === 'high'
          ? color
          : 'transparent',
      borderColor:
        disable && emphasis === 'medium'
          ? getDisabledColor(color)
          : emphasis === 'medium'
          ? colorScheme.dark
          : 'transparent',
      borderRadius: config.padding(1),
      borderWidth: 1,
      flexDirection: 'row',
      padding: noPadding ? config.padding(0) : config.padding(2),
      paddingHorizontal: noPadding ? config.padding(0) : config.padding(4),
    },
    invisible: {
      opacity: 0,
    },
    label: {
      height: config.padding(5),
      justifyContent: 'flex-start',
      marginVertical: config.padding(1),
      paddingHorizontal: 0,
    },
    right: {
      alignSelf: 'flex-end',
    },
    text: {
      color: disable
        ? getDisabledColor(color)
        : emphasis === 'high'
        ? colorScheme.background
        : color,
    },
  });
