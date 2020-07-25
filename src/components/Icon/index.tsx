import React from 'react';
import {Platform, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {el} from 'date-fns/locale';
import {Config, Theme} from '../../utils';
import {useColor, useDropShadow} from '../../hooks';
import {TouchableOpacity} from '../TouchableOpacity';
import {Badge} from './Badge';
import {Source} from './Source';

/*
usage: <Icon name='check' />
source: https://materialdesignicons.com/
*/

interface Props {
  badge?: number;
  elevation?: number;
  right?: boolean;
  fab?: boolean;
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
  clear?: boolean;
  hidden?: boolean;
  invisible?: boolean;
  size?: number;
  color?: string;
  name?: string;
  onPress?: () => void;
}

export var Icon = ({
  name,
  style,
  activeOpacity,
  badge = 0,
  clear,
  elevation = 4,
  size = Theme.padding.p06,
  color,
  fab,
  hidden,
  right,
  invisible,
  onPress,
}: Props) => {
  const colors = useColor();
  const dropShadow = useDropShadow();
  const styles = StyleSheet.create({
    fab: {
      alignItems: 'center',
      backgroundColor: colors.primary,
      borderRadius: Theme.padding.p15,
      height: Theme.padding.p15,
      justifyContent: 'center',
      width: Theme.padding.p15,
      ...dropShadow(elevation),
    },
    right: {
      alignSelf: 'flex-end',
    },
    web: {
      height: Theme.padding.p06,
      width: Theme.padding.p06,
    },
  });
  const colored = clear ? colors.background : color ? color : colors.dark;
  const containerStyles = [
    Platform.OS === Config.os.web ? styles.web : undefined,
    fab ? styles.fab : undefined,
    right ? styles.right : undefined,
    style,
  ];
  return name === undefined || name.length === 0 || hidden ? null : (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={!onPress}
      onPress={onPress}
      style={containerStyles}>
      <Source color={colored} invisible={invisible} name={name} size={size} />
      <Badge badge={badge} />
    </TouchableOpacity>
  );
};
