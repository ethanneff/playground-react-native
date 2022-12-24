import React, { memo } from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import Original from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconName } from './config';

type Props = {
  color?: string;
  invisible?: boolean;
  name: IconName;
  size?: number;
  style?: StyleProp<TextStyle>;
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
      style={containerStyle}
    />
  );
});
