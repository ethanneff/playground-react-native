import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {Calendar, Card, Screen, Text} from '../../components';
import {ScrollView} from '../../conversions';
import {padding, useColor} from '../../features';

export const Day = memo(function Day() {
  const {goBack} = useNavigation();
  const color = useColor();

  return (
    <Screen dropShadow onLeftPress={goBack} title="Comfort Zone">
      <ScrollView
        contentContainerStyle={{
          padding: padding(4),
          backgroundColor: color.background.secondary,
        }}>
        <Card>
          <Text
            center
            style={{paddingBottom: padding(4)}}
            title="Progress"
            type="h3"
          />
          <Calendar />
        </Card>
      </ScrollView>
    </Screen>
  );
});
