import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { Calendar, Card, Screen, ScrollView, Text } from '../../components';
import { padding, useColors } from '../../features';

export const Day = memo(function Day() {
  const { goBack } = useNavigation();
  const colors = useColors();

  return (
    <Screen dropShadow onLeftPress={goBack} title="Comfort Zone">
      <ScrollView
        contentContainerStyle={{
          padding: padding(4),
          backgroundColor: colors.background.secondary,
        }}
      >
        <Card>
          <Text
            center
            style={{ paddingBottom: padding(4) }}
            title="Progress"
            type="h3"
          />
          <Calendar />
        </Card>
      </ScrollView>
    </Screen>
  );
});
