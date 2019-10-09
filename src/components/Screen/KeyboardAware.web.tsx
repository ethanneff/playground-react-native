import React, { memo } from "react";
import { ViewStyle, View } from "react-native";

interface Props {
  disableScroll?: boolean;
  style?: ViewStyle | {};
}

export const KeyboardAware: React.FC<Props> = memo(function KeyboardAware({
  children,
  style
}) {
  return <View style={style}>{children}</View>;
});
