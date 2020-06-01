import React, {memo} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

interface Props {
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const KeyboardAware: React.FC<Props> = memo(function KeyboardAware({
  children,
  style,
}) {
  return <View style={style}>{children}</View>;
});
