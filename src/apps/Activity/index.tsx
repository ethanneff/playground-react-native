import React, {memo} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Screen, Activity, Icon} from '../../components';
import {useNav, useColor} from '../../hooks';
import {Theme} from '../../utils';

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
    background: {
      backgroundColor: color.surface,
    },
    container: {
      paddingHorizontal: Theme.padding.p04,
      paddingVertical: Theme.padding.p02,
    },
  });

  return (
    <Screen onLeftPress={nav.to('portfolioLanding')} title="Activity">
      <ScrollView
        style={styles.background}
        contentContainerStyle={styles.container}>
        <Activity username="ethanneff" site="github" title="Github" />
        <Activity username="ethanneff" site="leetCode" title="LeetCode" />
        <Activity username="ethanneff" site="hackerRank" title="HackerRank" />
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
