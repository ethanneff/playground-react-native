import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {
  Activity,
  Card,
  Icon,
  Screen,
  Text,
  TouchableOpacity,
} from '../../components';
import {ScrollView} from '../../conversions';
import {useAdminNavBack, useColor} from '../../hooks';
import {padding} from '../../utils';
import {DeepWorkNavigation} from './types';

/*
# Purpose
- create a habit of deep work

# Vision
- focus on the number of sessions of deep work
- goals will be achieved over time based on the number of deep work

# Methodology
- block off calendar 4 weeks in advance
- track the number of deep work hours per day (aim for 4) (dark green dots)
- ?group deep work activities by goals (categories)
- highlight major milestones in the deep work hour (yellow star)

# Next steps
- rewrite activity to pass data
- add redux
- add login
- add account screen (profile, notifications, best practices) https://memory.ai/timely-blog/how-to-do-deep-work-effectively
- add day screen (number of deep work, notes, reflection, milestones)
- add backend
- ship
*/

export const Home = memo(function Home() {
  const {navigate} = useNavigation<DeepWorkNavigation>();
  const color = useColor();
  const {onLeftPress} = useAdminNavBack();
  const onItemAdd = useCallback(() => undefined, []);
  const navToAccount = useCallback(() => navigate('account'), [navigate]);

  return (
    <Screen
      dropShadow
      onLeftPress={onLeftPress}
      onRightPress={navToAccount}
      rightIcon="account"
      title="Deep Work">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: padding(4),
          paddingVertical: padding(2),
        }}
        style={{backgroundColor: color.background.secondary}}>
        <Card>
          <Text
            center
            emphasis="medium"
            title="Deep Work = Focus + Intensity"
            type="h5"
          />
        </Card>
        <Activity site="random" title="Be stronger" username="none" />
        <Activity site="random" title="Ship apps" username="none" />
        <Activity site="random" title="Master leetcode" username="none" />
        <Activity site="random" title="Master system design" username="none" />
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          flexDirection: 'row',
          margin: padding(4),
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={onItemAdd} style={{marginRight: padding(2)}}>
          <Icon backgroundColor="secondary" color="primaryA" fab name="plus" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onItemAdd}>
          <Icon color="primaryA" fab name="pencil" />
        </TouchableOpacity>
      </View>
    </Screen>
  );
});
