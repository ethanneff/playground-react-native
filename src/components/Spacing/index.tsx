import React, { ReactElement } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { padding } from '../../features';

type Props = {
  children?: ReactElement | ReactElement[];
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
    <View style={[{ padding: padding(p), margin: padding(m) }, style]}>
      {children}
    </View>
  );
};
