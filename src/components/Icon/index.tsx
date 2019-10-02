import React, { memo } from "react";
import { Platform, View, ViewStyle } from "react-native";
import { getCurrentColor } from "../../models";
import { Config, Theme, useRootSelector } from "../../utils";
import { Badge } from "./Badge";
import { Source } from "./Source";

/*
usage: <Icon name='check' />
source: https://materialdesignicons.com/
*/

interface Props {
  badge?: number;
  style?: ViewStyle | {};
  clear?: boolean;
  hidden?: boolean;
  invisible?: boolean;
  size?: number;
  color?: string;
  name?: string;
}

export const Icon: React.FC<Props> = memo(function Icon({
  name,
  style,
  badge = 0,
  clear,
  size = Theme.padding.p06,
  color,
  hidden,
  invisible
}) {
  const colors = useRootSelector(state => getCurrentColor(state));
  const colored = clear ? colors.background : color ? color : colors.dark;
  const containerStyles =
    Platform.OS === Config.os.web ? { width: 20, height: 20 } : style;
  return name === undefined || name.length === 0 || hidden ? null : 
    <View style={containerStyles}>
      <Source name={name} size={size} color={colored} invisible={invisible} />
      <Badge badge={badge} />
    </View>
  ;
});
