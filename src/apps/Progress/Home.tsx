import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Activity, Icon, Screen} from '../../components';
import {ScrollView} from '../../conversions';
import {useAdminNavBack, useColor} from '../../hooks';
import {padding} from '../../utils';

// TODO: gitlab
// TODO: selected
// TODO: add
// TODO: delete
// TODO: save
// TODO: new
// TODO: unable to navigate back when loading

export const Home = memo(function ActivityTracker() {
  const color = useColor();
  const {onLeftPress} = useAdminNavBack();
  const styles = StyleSheet.create({
    background: {
      backgroundColor: color.background.secondary,
    },
    container: {
      paddingHorizontal: padding(4),
      paddingVertical: padding(2),
    },
  });

  return (
    <Screen dropShadow onLeftPress={onLeftPress} title="Progress">
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.background}>
        <Activity site="github" title="Github" username="ethanneff" />
        <Activity site="leetCode" title="LeetCode" username="ethanneff" />
        <Activity site="hackerRank" title="HackerRank" username="ethanneff" />
      </ScrollView>
      <Icon
        color="primaryB"
        fab
        name="plus"
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          margin: padding(4),
        }}
      />
    </Screen>
  );
});
