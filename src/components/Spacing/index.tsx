import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { spacing } from '../../features';

type Props = {
  children?: ReactNode;
  margin?: number;
  padding?: number;
  style?: StyleProp<ViewStyle>;
};

export const Spacing = ({
  padding: p = 0,
  margin: m = 0,
  children,
  style,
}: Props) => {
  return (
    <View style={[{ padding: spacing(p), margin: spacing(m) }, style]}>
      {children}
    </View>
  );
};
