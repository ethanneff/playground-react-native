import React, {memo, useCallback, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Button, Card, Icon, Screen, Text} from '../../components';
import {useColor, useNav} from '../../hooks';
import {Theme} from '../../utils';
import {Login} from '../../features/Login';

export default memo(function Checklists() {
  const color = useColor();
  const nav = useNav();
  const styles = StyleSheet.create({
    bottom: {
      paddingBottom: Theme.padding.p04,
    },
  });
  const [showLogin, setShowLogin] = useState(false);
  const onToggleLogin = useCallback(() => setShowLogin((prev) => !prev), []);
  const navBack = useCallback(nav('portfolioLanding'), [nav]);

  return (
    <>
      <Screen onLeftPress={navBack} title="Checklists">
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: Theme.padding.p04,
            paddingVertical: Theme.padding.p02,
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
            margin: Theme.padding.p04,
          }}
        />
        <Button onPress={onToggleLogin} title="showLogin" />
      </Screen>
      {showLogin && <Login onBackgroundPress={onToggleLogin} />}
    </>
  );
});
