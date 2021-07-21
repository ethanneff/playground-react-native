import React, {memo} from 'react';
import {Platform, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {useColor, useDropShadow} from '../../hooks';
import {MonoMultiColor, padding} from '../../utils';
import {Badge} from './Badge';
import {Source} from './Source';

/*
usage: <Icon name='check' />
source: https://materialdesignicons.com/
*/

type Props = {
  badge?: number;
  elevation?: number;
  right?: boolean;
  fab?: boolean;
  style?: StyleProp<ViewStyle>;
  clear?: boolean;
  hidden?: boolean;
  invisible?: boolean;
  padded?: boolean;
  size?: number;
  color?: keyof MonoMultiColor;
  backgroundColor?: keyof MonoMultiColor;
  name?: string;
  testID?: string;
  disabled?: boolean;
};

export const Icon = memo(function Icon({
  name,
  style,
  badge = 0,
  clear,
  elevation = 4,
  size = padding(6),
  color,
  backgroundColor,
  fab,
  hidden,
  right,
  invisible,
  disabled,
  padded,
  testID,
}: Props) {
  const colors = useColor();
  const bgColor = backgroundColor
    ? colors.background[backgroundColor]
    : colors.text.accent;
  const dropShadow = useDropShadow();
  const styles = StyleSheet.create({
    fab: {
      alignItems: 'center',
      backgroundColor: bgColor,
      borderRadius: padding(15),
      height: padding(15),
      justifyContent: 'center',
      width: padding(15),
      ...dropShadow(elevation),
    },
    icon: {
      justifyContent: 'center',
    },
    padded: {
      padding: padding(2),
    },
    right: {
      alignSelf: 'flex-end',
    },
    web: {
      height: padding(6),
      width: padding(6),
    },
  });
  const colored = hidden
    ? 'transparent'
    : disabled
    ? colors.text.disabled
    : clear
    ? colors.text.primaryB
    : color
    ? colors.text[color]
    : colors.text.secondary;
  const containerStyles = [
    Platform.OS === 'web' ? styles.web : undefined,
    fab ? styles.fab : undefined,
    right ? styles.right : undefined,
    padded ? styles.padded : undefined,
    styles.icon,
    style,
  ];
  return !name ? null : (
    <View style={containerStyles} testID={testID}>
      <Source color={colored} invisible={invisible} name={name} size={size} />
      <Badge badge={badge} />
    </View>
  );
});
