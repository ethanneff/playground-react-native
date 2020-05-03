import React, {memo} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Screen, Text, Card, Icon} from '../../components';
import {useNav, useColor} from '../../hooks';
import {Theme} from '../../utils';

export default memo(function Checklists() {
  const color = useColor();
  const nav = useNav();
  const styles = StyleSheet.create({
    bottom: {
      paddingBottom: Theme.padding.p04,
    },
  });

  return (
    <Screen onLeftPress={nav.to('portfolioLanding')} title="Checklists">
      <ScrollView
        style={{backgroundColor: color.surface}}
        contentContainerStyle={{
          paddingHorizontal: Theme.padding.p04,
          paddingVertical: Theme.padding.p02,
        }}>
        <Card>
          <Text
            style={styles.bottom}
            type="h4"
            emphasis="medium"
            title="Weekly Goals"
          />
          <Text type="caption" title="1. complete learn plan profit" />
          <Text type="caption" title="2. ship checklist" />
          <Text type="caption" title="3. complete 30 leetcode" />
        </Card>
        <Card>
          <Text
            style={styles.bottom}
            type="h4"
            emphasis="medium"
            title="Daily Habits and Routines"
          />
          <Text type="caption" title="After I wake up" />
          <Text type="caption" title="After I shower" />
          <Text type="caption" title="Before I one on one" />
          <Text type="caption" title="Before I get on the train" />
        </Card>
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
