import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Activity, Icon, Screen, ScrollView } from '../../components';
import { spacing, useAdminNavBack, useColors } from '../../features';

// TODO: gitlab
// TODO: selected
// TODO: add
// TODO: delete
// TODO: save
// TODO: new
// TODO: unable to navigate back when loading

export const Home = memo(function ActivityTracker() {
  const colors = useColors();
  const { onLeftPress } = useAdminNavBack();
  const styles = StyleSheet.create({
    background: {
      backgroundColor: colors.background.secondary,
    },
    container: {
      paddingHorizontal: spacing(4),
      paddingVertical: spacing(2),
    },
  });

  return (
    <Screen
      dropShadow
      onLeftPress={onLeftPress}
      title="Progress"
    >
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.background}
      >
        <Activity
          site="github"
          title="Github"
          username="ethanneff"
        />
        <Activity
          site="leetCode"
          title="LeetCode"
          username="ethanneff"
        />
        <Activity
          site="hackerRank"
          title="HackerRank"
          username="ethanneff"
        />
      </ScrollView>
      <Icon
        color="primaryB"
        fab
        name="plus"
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          margin: spacing(4),
        }}
      />
    </Screen>
  );
});
