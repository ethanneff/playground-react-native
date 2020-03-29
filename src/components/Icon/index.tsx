import React, {memo} from 'react';
import {
  Platform,
  ViewStyle,
  TouchableOpacity,
  StyleProp,
  StyleSheet,
} from 'react-native';
import {Config, Theme} from '../../utils';
import {Badge} from './Badge';
import {Source} from './Source';
import {useColor, useDropShadow} from '../../hooks';

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

export const Icon: React.FC<Props> = memo(function Icon({
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
}) {
  const colors = useColor();
  const dropShadow = useDropShadow(elevation);
  const styles = StyleSheet.create({
    fab: {
      width: Theme.padding.p15,
      height: Theme.padding.p15,
      borderRadius: Theme.padding.p15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary,
      ...dropShadow,
    },
    web: {
      width: Theme.padding.p06,
      height: Theme.padding.p06,
    },
    right: {
      alignSelf: 'flex-end',
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
      style={containerStyles}
      disabled={!onPress}
      onPress={onPress}>
      <Source name={name} size={size} color={colored} invisible={invisible} />
      <Badge badge={badge} />
    </TouchableOpacity>
  );
});
