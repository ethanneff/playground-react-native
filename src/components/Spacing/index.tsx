import React, { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { View } from '../../components';
import { spacing } from '../../features';

type Props = {
  children?: ReactNode;
  margin?: number;
  padding?: number;
  style?: StyleProp<ViewStyle>;
};

export const Spacing = ({
  children,
  margin: m = 0,
  padding: p = 0,
  style,
}: Props) => {
  return (
    <View style={[{ margin: spacing(m), padding: spacing(p) }, style]}>
      {children}
    </View>
  );
};
