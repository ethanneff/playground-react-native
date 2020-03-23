import React, { memo } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Screen, Text, Card, Activity, Icon } from '../../components';
import { useNav, useColor } from '../../hooks';
import { Theme } from '../../utils';

// TODO: gitlab
// TODO: selected
// TODO: add
// TODO: delete
// TODO: save
// TODO: new
// TODO: unable to navigate back when loading

export default memo(function ActivityTracker() {
  const color = useColor();
  const nav = useNav();
  const styles = StyleSheet.create({
    bottom: {
      paddingBottom: Theme.padding.p04,
    },
  });

  return (
    <Screen onLeftPress={nav.to('portfolioLanding')} title="Activity" border>
      <ScrollView
        style={{ backgroundColor: color.surface }}
        contentContainerStyle={{
          paddingHorizontal: Theme.padding.p04,
          paddingVertical: Theme.padding.p02,
        }}
      >
        <Card>
          <Text style={styles.bottom} h4 medium title="Github" />
          <Activity username="ethanneff" site="github" />
        </Card>
        <Card>
          <Text style={styles.bottom} h4 medium title="LeetCode" />
          <Activity username="ethanneff" site="leetCode" />
        </Card>
        <Card>
          <Text style={styles.bottom} h4 medium title="HackerRank" />
          <Activity username="ethanneff" site="hackerRank" />
        </Card>
        <View style={{ height: Theme.padding.p04 }} />
      </ScrollView>
      <Icon
        name="plus"
        fab
        onPress={() => undefined}
        color={color.background}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          margin: Theme.padding.p04,
        }}
      />
    </Screen>
  );
});
