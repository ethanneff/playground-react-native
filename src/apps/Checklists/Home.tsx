import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Card, Icon, Screen, Text} from '../../components';
import {ScrollView} from '../../conversions';
import {Login} from '../../features/Login';
import {useColor} from '../../hooks';
import {Config} from '../../utils';

export const Home = memo(function Checklists() {
  const color = useColor();
  const {goBack} = useNavigation();
  const styles = StyleSheet.create({
    bottom: {
      paddingBottom: Config.padding(4),
    },
  });
  const [showLogin, setShowLogin] = useState(false);
  const onToggleLogin = useCallback(() => setShowLogin((prev) => !prev), []);
  const navBack = useCallback(() => goBack(), [goBack]);

  return (
    <>
      <Screen onLeftPress={navBack} title="Checklists">
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: Config.padding(4),
            paddingVertical: Config.padding(2),
          }}
          style={{backgroundColor: color.surface}}>
          <Card>
            <Text
              emphasis="medium"
              style={styles.bottom}
              title="Weekly Goals"
              type="h4"
            />
            <Text title="1. complete learn plan profit" type="caption" />
            <Text title="2. ship checklist" type="caption" />
            <Text title="3. complete 30 leetcode" type="caption" />
          </Card>
          <Card>
            <Text
              emphasis="medium"
              style={styles.bottom}
              title="Daily Habits and Routines"
              type="h4"
            />
            <Text title="After I wake up" type="caption" />
            <Text title="After I shower" type="caption" />
            <Text title="Before I one on one" type="caption" />
            <Text title="Before I get on the train" type="caption" />
          </Card>
        </ScrollView>
        <Icon
          color={color.background}
          fab
          name="plus"
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            margin: Config.padding(4),
          }}
        />
        <Button onPress={onToggleLogin} title="showLogin" />
      </Screen>
      {showLogin && <Login onBackgroundPress={onToggleLogin} />}
    </>
  );
});
