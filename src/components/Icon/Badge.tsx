import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "../../utils";
import { Text } from "../Text";

const styles = StyleSheet.create({
  badgeContainer: {
    alignItems: "center",
    backgroundColor: Theme.color.primary,
    borderRadius: Theme.padding.p05,
    height: Theme.padding.p05,
    justifyContent: "center",
    position: "absolute",
    right: -Theme.padding.p02,
    top: -Theme.padding.p02,
    width: Theme.padding.p05
  },
  badgeText: {
    color: Theme.color.background,
    fontSize: Theme.padding.p02
  }
});

interface Props {
  badge: number;
}

const badgeLimit = "!";
const maxBadgeNumber = 99;

export const Badge: React.FC<Props> = memo(({ badge }) => {
  const num = badge > maxBadgeNumber ? badgeLimit : String(badge);
  return badge <= 0 ? null : 
    <View style={styles.badgeContainer}>
      <Text center style={styles.badgeText} title={num} />
    </View>
  ;
});
