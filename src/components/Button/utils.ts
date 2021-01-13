import {StyleSheet} from 'react-native';
import {Color} from './../../models/Theme';
import {Config, getDisabledColor} from './../../utils/Config/index';
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
      borderRadius: Config.padding(1),
      borderWidth: 1,
      flexDirection: 'row',
      padding: noPadding ? Config.padding(0) : Config.padding(2),
      paddingHorizontal: noPadding ? Config.padding(0) : Config.padding(4),
    },
    invisible: {
      opacity: 0,
    },
    label: {
      height: Config.padding(5),
      justifyContent: 'flex-start',
      marginVertical: Config.padding(1),
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
