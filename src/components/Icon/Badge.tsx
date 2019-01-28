import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "..";
import { Theme } from "../../utils";

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
  badge: number;
}

export class Badge extends React.PureComponent<Props> {
  private badgeLimit = "!";
  private maxBadgeNumber = 99;
  public render() {
    const { badge } = this.props;
    const num = badge > this.maxBadgeNumber ? this.badgeLimit : String(badge);
    if (badge <= 0) {
      return null;
    }
    return (
      <View style={styles.badgeContainer}>
        <Text center style={styles.badgeText} title={num} />
      </View>
    );
  }
}
