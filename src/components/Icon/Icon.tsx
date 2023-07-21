import React from 'react';
import {
  Platform,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { View } from '../../components';
import {
  spacing,
  useColors,
  useDropShadow,
  type MonoMultiColor,
} from '../../features';
import { Badge } from './Badge';
import { Source } from './Source';
import { type IconName } from './config';
import { getColor } from './utils';

/*
Usage: <Icon name='check' />
source: https://materialdesignicons.com/
*/

type Props = {
  readonly backgroundColor?: keyof MonoMultiColor;
  readonly badge?: number;
  readonly clear?: boolean;
  readonly color?: keyof MonoMultiColor;
  readonly disabled?: boolean;
  readonly elevation?: number;
  readonly fab?: boolean;
  readonly hidden?: boolean;
  readonly invisible?: boolean;
  readonly name: IconName;
  readonly padded?: boolean;
  readonly right?: boolean;
  readonly size?: number;
  readonly style?: StyleProp<ViewStyle>;
  readonly testID?: string;
};

export const Icon = ({
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
}: Props) => {
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
        accessibilityLabel={name}
        color={colored}
        invisible={invisible}
        name={name}
        size={size}
      />
      <Badge badge={badge} />
    </View>
  );
};
