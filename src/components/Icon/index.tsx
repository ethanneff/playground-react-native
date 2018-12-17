// usage: <Icon name='check' />
// source: https://materialdesignicons.com/

import * as React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Text } from "..";
import { Theme } from "../../utils";
import { IconSource } from "./IconSource";

const styles = StyleSheet.create({
  badgeContainer: {
    position: "absolute",
    right: -10,
    top: -10,
    height: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.color.primary,
    borderRadius: 20
  },
  badgeText: {
    fontSize: Theme.padding.p2,
    color: Theme.color.background
  }
});

interface Props {
  badge?: number;
  style?: ViewStyle | {};
  clear?: boolean;
  size?: number;
  color?: string;
  name: string;
}

export class Icon extends React.PureComponent<Props> {
  public defaultBadge = 0;
  public badgeLimit = "!";
  public maxBadgeNumber = 99;
  public defaultIconSize = Theme.padding.p6;
  public defaultActiveColor = Theme.color.dark;

  public render() {
    const {
      name,
      style,
      badge = this.defaultBadge,
      clear,
      size = this.defaultIconSize,
      color = this.defaultActiveColor
    } = this.props;
    const colored = clear ? Theme.color.background : color;
    const num = badge > this.maxBadgeNumber ? this.badgeLimit : String(badge);
    return (
      <View style={style}>
        <IconSource name={name} size={size} color={colored} style={style} />
        {badge > 0 && (
          <View style={styles.badgeContainer}>
            <Text center style={styles.badgeText} title={num} />
          </View>
        )}
      </View>
    );
  }
}
