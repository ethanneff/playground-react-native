import React, { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { View } from '../../components';

type Props = {
  children?: ReactNode;
  margin?: number;
  padding?: number;
  style?: StyleProp<ViewStyle>;
};

export const Spacing = ({
  children,
  margin = 0,
  padding = 0,
  style,
}: Props) => {
  return <View style={[{ margin, padding }, style]}>{children}</View>;
};
