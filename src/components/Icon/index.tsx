import React, { memo } from "react";
import { Platform, ViewStyle, TouchableOpacity, StyleProp } from "react-native";
import { Config, Theme } from "../../utils";
import { Badge } from "./Badge";
import { Source } from "./Source";
import { useColor } from "../../hooks";

/*
usage: <Icon name='check' />
source: https://materialdesignicons.com/
*/

interface Props {
  badge?: number;
  style?: StyleProp<ViewStyle>;
  clear?: boolean;
  hidden?: boolean;
  invisible?: boolean;
  size?: number;
  color?: string;
  name?: string;
  onPress?: () => void;
}

export const Icon: React.FC<Props> = memo(function Icon({
  name,
  style,
  badge = 0,
  clear,
  size = Theme.padding.p06,
  color,
  hidden,
  invisible,
  onPress
}) {
  const colors = useColor();
  const colored = clear ? colors.background : color ? color : colors.dark;
  const containerStyles =
    Platform.OS === Config.os.web ? { width: 20, height: 20 } : style;
  return name === undefined || name.length === 0 || hidden ? null : (
    <TouchableOpacity
      style={containerStyles}
      disabled={!onPress}
      onPress={onPress}
    >
      <Source name={name} size={size} color={colored} invisible={invisible} />
      <Badge badge={badge} />
    </TouchableOpacity>
  );
});
