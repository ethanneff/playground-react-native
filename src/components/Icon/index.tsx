/*
usage: <Icon name='check' />
source: https://materialdesignicons.com/
*/

import React, { memo } from "react";
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

export const Icon: React.FC<Props> = memo(
  ({
    name,
    style,
    badge = 0,
    clear,
    size = Theme.padding.p06,
    color,
    hidden,
    invisible
  }) => {
    const colors = useRootSelector(state => getCurrentColor(state));
    const styles = StyleSheet.create({
      invisible: {
        opacity: 0
      }
    });
    const colored = clear ? colors.background : color ? color : colors.dark;
    const containerStyles = [invisible && styles.invisible, style];
    return name === undefined || name.length === 0 || hidden ? null : (
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
  }
);
