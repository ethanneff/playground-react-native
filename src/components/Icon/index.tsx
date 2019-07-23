/*
usage: <Icon name='check' />
source: https://materialdesignicons.com/
*/

import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { getCurrentColor } from "../../models";
import { Theme, useRootSelector } from "../../utils";
import { Badge } from "./Badge";
import { IconSource } from "./IconSource";

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

export const Icon: React.FC<Props> = props => {
  const colors = useRootSelector(state => getCurrentColor(state));
  const {
    name,
    style,
    badge = 0,
    clear,
    size = Theme.padding.p06,
    color = colors.dark,
    hidden,
    invisible
  } = props;
  const styles = StyleSheet.create({
    invisible: {
      opacity: 0
    }
  });
  const colored = clear ? Theme.color.background : color;
  const containerStyles = [invisible && styles.invisible, style];
  if (name === undefined || name.length === 0 || hidden) {
    return null;
  }
  return (
    <View style={containerStyles}>
      <IconSource
        name={name}
        size={size}
        color={colored}
        style={containerStyles}
      />
      <Badge badge={badge} />
    </View>
  );
};
