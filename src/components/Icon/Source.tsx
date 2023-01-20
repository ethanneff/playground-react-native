import React, { memo } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import Original from 'react-native-vector-icons/MaterialCommunityIcons';
import { type IconName } from './config';

type Props = {
  color?: string;
  invisible?: boolean;
  name: IconName;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  invisible: {
    opacity: 0,
  },
});

export const Source = memo(function IconSource({
  color,
  invisible,
  name,
  size,
  style,
}: Props) {
  const containerStyle = [invisible ? styles.invisible : undefined, style];
  return (
    <Original
      color={color}
      name={name}
      size={size}
      // @ts-expect-error Types of property 'aspectRatio' are incompatible.
      style={containerStyle}
    />
  );
});
