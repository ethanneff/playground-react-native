import React from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import Original from 'react-native-vector-icons/MaterialCommunityIcons';
import { type IconName } from './config';

type Properties = {
  readonly accessibilityLabel?: string;
  readonly accessible?: boolean;
  readonly color?: string;
  readonly invisible?: boolean;
  readonly name: IconName;
  readonly size?: number;
  readonly style?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  invisible: {
    opacity: 0,
  },
});

export const Source = ({
  accessibilityLabel,
  accessible,
  color,
  invisible,
  name,
  size,
  style,
}: Properties) => {
  const containerStyle = [invisible ? styles.invisible : undefined, style];
  return (
    <Original
      accessibilityLabel={accessibilityLabel}
      accessible={accessible}
      color={color}
      name={name}
      size={size}
      style={containerStyle}
    />
  );
};
