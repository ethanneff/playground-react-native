import React, { memo } from "react";
import { ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  name: string;
  size: number;
  color: string;
  style?: ViewStyle | {};
}

export const IconSource: React.FC<Props> = memo(
  ({ name, size, color, style }) => (
    <Icon name={name} size={size} color={color} style={style} />
  )
);
