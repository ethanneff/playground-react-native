import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Activity, Icon, Screen} from '../../components';
import {ScrollView} from '../../conversions';
import {useColor} from '../../hooks';
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
  const {goBack} = useNavigation();
  const styles = StyleSheet.create({
    background: {
      backgroundColor: color.surface,
    },
    container: {
      paddingHorizontal: Theme.padding.p04,
      paddingVertical: Theme.padding.p02,
    },
  });

  const navBack = useCallback(() => goBack(), [goBack]);

  return (
    <Screen dropShadow onLeftPress={navBack} title="Progress">
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
