import React from 'react';
import { Calendar, Card, Screen, ScrollView, Text } from '../../components';
import { useNavigation } from '../../conversions';
import { spacing, useColors } from '../../features';

export const Day = () => {
  const { goBack } = useNavigation();
  const colors = useColors();

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Comfort Zone"
    >
      <ScrollView
        contentContainerStyle={{
          backgroundColor: colors.background.secondary,
          padding: spacing(4),
        }}
      >
        <Card>
          <Text
            center
            style={{ paddingBottom: spacing(4) }}
            title="Progress"
            type="h3"
          />
          <Calendar />
        </Card>
      </ScrollView>
    </Screen>
  );
};
