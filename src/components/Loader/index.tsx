import React from 'react';
import {
  // eslint-disable-next-line no-restricted-imports
  ActivityIndicator,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { View } from '../../components';
import { useColors, type MonoMultiColor } from '../../features';

type Properties = {
  readonly color?: keyof MonoMultiColor;
  readonly size?: number | 'large' | 'small';
  readonly style?: StyleProp<ViewStyle>;
};

export const Loader = ({ color, size = 'large', style }: Properties) => {
  const colors = useColors();
  const loaderColor = color ? colors.text[color] : colors.text.secondary;

  return (
    <View
      backgroundColor="primaryA"
      flex={1}
      justifyContent="center"
      style={style}
    >
      <ActivityIndicator
        color={loaderColor}
        size={size}
      />
    </View>
  );
};
