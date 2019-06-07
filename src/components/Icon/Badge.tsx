import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "../../utils";
import { Text } from "../Text";

const styles = StyleSheet.create({
  badgeContainer: {
    alignItems: "center",
    backgroundColor: Theme.color.primary,
    borderRadius: 20,
    height: 20,
    justifyContent: "center",
    position: "absolute",
    right: -10,
    top: -10,
    width: 20
  },
  badgeText: {
    color: Theme.color.background,
    fontSize: Theme.padding.p02
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
