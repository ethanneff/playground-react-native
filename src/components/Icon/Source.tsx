import React, { memo } from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import Original from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  color?: string;
  invisible?: boolean;
  name: string;
  size?: number;
  style?: StyleProp<TextStyle>;
};

const styles = StyleSheet.create({
  invisible: {
    opacity: 0,
  },
});

export const Source = memo(function IconSource({
  name,
  size,
  color,
  style,
  invisible,
}: Props) {
  const containerStyle = [invisible ? styles.invisible : undefined, style];
  return (
    <Original color={color} name={name} size={size} style={containerStyle} />
  );
});
