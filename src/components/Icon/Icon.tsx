import React, { memo } from 'react';
import {
  Platform,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { View } from '../../components';
import {
  type ColorTheme,
  type MonoMultiColor,
  spacing,
  useColors,
  useDropShadow,
} from '../../features';
import { Badge } from './Badge';
import { Source } from './Source';
import { type IconName } from './config';

/*
Usage: <Icon name='check' />
source: https://materialdesignicons.com/
*/

type Props = {
  backgroundColor?: keyof MonoMultiColor;
  badge?: number;
  clear?: boolean;
  color?: keyof MonoMultiColor;
  disabled?: boolean;
  elevation?: number;
  fab?: boolean;
  hidden?: boolean;
  invisible?: boolean;
  name: IconName;
  padded?: boolean;
  right?: boolean;
  size?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

type GetColors = {
  clear?: boolean;
  color?: keyof MonoMultiColor;
  colors: ColorTheme;
  disabled?: boolean;
  hidden?: boolean;
};

const getColor = ({ clear, color, colors, disabled, hidden }: GetColors) => {
  return hidden
    ? 'transparent'
    : disabled
    ? colors.text.disabled
    : clear
    ? colors.text.primaryB
    : color
    ? colors.text[color]
    : colors.text.secondary;
};

export const Icon = memo(function Icon({
  backgroundColor,
  badge = 0,
  clear,
  color,
  disabled,
  elevation = 4,
  fab,
  hidden,
  invisible,
  name,
  padded,
  right,
  size = spacing(6),
  style,
  testID,
}: Props) {
  const colors = useColors();
  const bgColor = backgroundColor
    ? colors.background[backgroundColor]
    : colors.text.accent;
  const dropShadow = useDropShadow();
  const styles = StyleSheet.create({
    fab: {
      alignItems: 'center',
      backgroundColor: bgColor,
      borderRadius: spacing(15),
      height: spacing(15),
      justifyContent: 'center',
      width: spacing(15),
      ...dropShadow(elevation),
    },
    icon: {
      justifyContent: 'center',
    },
    padded: {
      padding: spacing(2),
    },
    right: {
      alignSelf: 'flex-end',
    },
    web: {
      height: spacing(6),
      width: spacing(6),
    },
  });
  const colored = getColor({ clear, color, colors, disabled, hidden });

  const containerStyles = [
    Platform.OS === 'web' ? styles.web : undefined,
    fab ? styles.fab : undefined,
    right ? styles.right : undefined,
    padded ? styles.padded : undefined,
    styles.icon,
    style,
  ];
  return (
    <View
      style={containerStyles}
      testID={testID}
    >
      <Source
        color={colored}
        invisible={invisible}
        name={name}
        size={size}
      />
      <Badge badge={badge} />
    </View>
  );
});
