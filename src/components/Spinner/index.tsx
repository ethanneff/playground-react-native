import React, { memo } from 'react';
import {
  // eslint-disable-next-line no-restricted-imports
  ActivityIndicator,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useColors, type MonoMultiColor } from '../../features';

type Props = {
  color?: keyof MonoMultiColor;
  size?: number | 'large' | 'small';
  style?: StyleProp<ViewStyle>;
};

export const Spinner = memo(function Spinner({
  color = 'primaryB',
  size = 'large',
  style,
}: Props) {
  const colors = useColors();

  return (
    <ActivityIndicator
      color={colors.text[color]}
      size={size}
      style={style}
    />
  );
});
