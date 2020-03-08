import React, { memo } from "react";
import { StyleSheet, ViewStyle, StyleProp } from "react-native";
import Original from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  invisible?: boolean;
}

const styles = StyleSheet.create({
  invisible: {
    opacity: 0
  }
});

export const Source: React.FC<Props> = memo(function IconSource({
  name,
  size,
  color,
  style,
  invisible
}) {
  const containerStyle = [invisible ? styles.invisible : undefined, style];
  return (
    <Original name={name} size={size} color={color} style={containerStyle} />
  );
});
