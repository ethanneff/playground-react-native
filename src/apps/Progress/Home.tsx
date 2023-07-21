import React from 'react';
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

export const Home = () => {
  const colors = useColors();
  const { onLeftPress } = useAdminNavBack();
  const styles = StyleSheet.create({
    background: {
      backgroundColor: colors.background.secondary,
    },
    container: {
      gap: spacing(4),
      padding: spacing(4),
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
          bottom: 0,
          margin: spacing(4),
          position: 'absolute',
          right: 0,
        }}
      />
    </Screen>
  );
};
