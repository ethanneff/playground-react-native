import React, {memo} from 'react';
import {Platform, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {useColor, useDropShadow} from '../../hooks';
import {config, getDisabledColor} from '../../utils';
import {TouchableOpacity} from '../TouchableOpacity';
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
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
  clear?: boolean;
  hidden?: boolean;
  invisible?: boolean;
  padded?: boolean;
  size?: number;
  color?: string;
  backgroundColor?: string;
  name?: string;
  onPress?: () => void;
  testID?: string;
  disabled?: boolean;
};

export const Icon = memo(function Icon({
  name,
  style,
  activeOpacity,
  badge = 0,
  clear,
  elevation = 4,
  size = config.padding(6),
  color,
  backgroundColor,
  fab,
  hidden,
  right,
  invisible,
  disabled,
  padded,
  onPress,
  testID,
}: Props) {
  const colors = useColor();
  const bgColor = backgroundColor ? backgroundColor : colors.primary;
  const dropShadow = useDropShadow();
  const styles = StyleSheet.create({
    fab: {
      alignItems: 'center',
      backgroundColor: bgColor,
      borderRadius: config.padding(15),
      height: config.padding(15),
      justifyContent: 'center',
      width: config.padding(15),
      ...dropShadow(elevation),
    },
    icon: {
      justifyContent: 'center',
    },
    padded: {
      padding: config.padding(2),
    },
    right: {
      alignSelf: 'flex-end',
    },
    web: {
      height: config.padding(6),
      width: config.padding(6),
    },
  });
  const colored = hidden
    ? 'transparent'
    : disabled
    ? getDisabledColor(color || colors.text)
    : clear
    ? colors.background
    : color
    ? color
    : colors.dark;
  const containerStyles = [
    Platform.OS === 'web' ? styles.web : undefined,
    fab ? styles.fab : undefined,
    right ? styles.right : undefined,
    padded ? styles.padded : undefined,
    styles.icon,
    style,
  ];
  return !name ? null : (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={!onPress || disabled || hidden}
      onPress={onPress}
      style={containerStyles}
      testID={testID}>
      <Source color={colored} invisible={invisible} name={name} size={size} />
      <Badge badge={badge} />
    </TouchableOpacity>
  );
});
