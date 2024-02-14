import React, { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { View } from '../../components';

type Properties = {
  readonly children?: ReactNode;
  readonly margin?: number;
  readonly padding?: number;
  readonly style?: StyleProp<ViewStyle>;
};

export const Spacing = ({
  children,
  margin = 0,
  padding = 0,
  style,
}: Properties) => <View style={[{ margin, padding }, style]}>{children}</View>;
