import React, { memo } from 'react';
import {
  // eslint-disable-next-line no-restricted-imports
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { MonoMultiColor, useColors } from '../../features';

type Props = {
  color?: keyof MonoMultiColor;
  size?: number | 'small' | 'large';
  style?: StyleProp<ViewStyle>;
};

export const Loader = memo(function Loader({
  color,
  size = 'large',
  style,
}: Props) {
  const colors = useColors();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background.primaryA,
      flex: 1,
      justifyContent: 'center',
    },
  });
  const loaderColor = color ? colors.text[color] : colors.text.secondary;

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator color={loaderColor} size={size} />
    </View>
  );
});
