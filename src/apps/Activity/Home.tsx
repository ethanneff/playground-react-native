import React, {memo, useCallback} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Activity, Icon, Screen} from '../../components';
import {useColor, useNav} from '../../hooks';
import {Theme} from '../../utils';

// TODO: gitlab
// TODO: selected
// TODO: add
// TODO: delete
// TODO: save
// TODO: new
// TODO: unable to navigate back when loading

export const Home = memo(function ActivityTracker() {
  const color = useColor();
  const nav = useNav();
  const styles = StyleSheet.create({
    background: {
      backgroundColor: color.surface,
    },
    container: {
      paddingHorizontal: Theme.padding.p04,
      paddingVertical: Theme.padding.p02,
    },
  });

  const navBack = useCallback(nav('portfolioLanding'), [nav]);

  return (
    <Screen onLeftPress={navBack} title="Activity">
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.background}>
        <Activity site="github" title="Github" username="ethanneff" />
        <Activity site="leetCode" title="LeetCode" username="ethanneff" />
        <Activity site="hackerRank" title="HackerRank" username="ethanneff" />
      </ScrollView>
      <Icon
        color={color.background}
        fab
        name="plus"
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
