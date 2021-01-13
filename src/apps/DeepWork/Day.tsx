import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Calendar, Card, Screen, Text} from '../../components';
import {ScrollView} from '../../conversions';
import {useColor} from '../../hooks';
import {config} from '../../utils';

export const Day = memo(function Day() {
  const {goBack} = useNavigation();
  const color = useColor();
  const navBack = useCallback(() => goBack(), [goBack]);
  return (
    <Screen dropShadow onLeftPress={navBack} title="Comfort Zone">
      <ScrollView
        contentContainerStyle={{
          padding: config.padding(4),
          backgroundColor: color.surface,
        }}>
        <Card>
          <Text
            center
            style={{paddingBottom: config.padding(4)}}
            title="Progress"
            type="h3"
          />
          <Calendar />
        </Card>
      </ScrollView>
    </Screen>
  );
});
