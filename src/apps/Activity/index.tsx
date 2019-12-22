import React, { memo } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Screen, Text, Card, Activity } from "../../components";
import { useNav, useColor } from "../../hooks";
import { Theme, colorWithOpacity, useRootSelector } from "../../utils";
import { getLightMode } from "../../models";

export default memo(function ActivityTracker() {
  const color = useColor();
  const lightMode = useRootSelector(getLightMode);

  const nav = useNav();
  const styles = StyleSheet.create({
    bottom: {
      paddingBottom: Theme.padding.p04
    }
  });

  return (
    <Screen onLeftPress={nav.to("portfolioLanding")} title="Activity">
      <ScrollView
        style={{
          backgroundColor: lightMode
            ? colorWithOpacity(color.text, 0.05)
            : "transparent", // TODO: make color
          paddingHorizontal: Theme.padding.p04,
          paddingVertical: Theme.padding.p02
        }}
      >
        <Card>
          <Text style={styles.bottom} h4 medium title="Github" />
          <Activity username="ethanneff" site="github" />
        </Card>
        <Card>
          <Text style={styles.bottom} h4 medium title="LeetCode" />
          <Activity username="ethanneff" site="leetcode" />
        </Card>
        <Card>
          <Text style={styles.bottom} h4 medium title="HackerRank" />
          <Activity username="ethanneff" site="hackerrank" />
        </Card>
        <View style={{ height: Theme.padding.p04 }} />
      </ScrollView>
    </Screen>
  );
});
