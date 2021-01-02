import {StyleSheet} from 'react-native';
import {colorWithOpacity, Theme} from '../../utils';
import {Color} from './../../models/Theme';
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
      alignSelf: 'center',
    },
    container: {
      backgroundColor:
        disable && emphasis === 'high'
          ? colorWithOpacity(color, 0.38)
          : emphasis === 'high'
          ? color
          : 'transparent',
      borderColor:
        disable && emphasis === 'medium'
          ? colorWithOpacity(color, 0.38)
          : emphasis === 'medium'
          ? colorScheme.dark
          : 'transparent',
      borderRadius: Theme.padding.p01,
      borderWidth: 1,
      flexDirection: 'row',
      padding: noPadding ? Theme.padding.p00 : Theme.padding.p02,
      paddingHorizontal: noPadding ? Theme.padding.p00 : Theme.padding.p04,
    },
    invisible: {
      opacity: 0,
    },
    label: {
      height: Theme.padding.p05,
      justifyContent: 'flex-start',
      marginVertical: Theme.padding.p01,
      paddingHorizontal: 0,
    },
    right: {
      alignSelf: 'flex-end',
    },
    text: {
      color: disable
        ? colorWithOpacity(color, 0.38)
        : emphasis === 'high'
        ? colorScheme.background
        : color,
    },
  });
