import React from 'react';
import { Calendar, Card, Screen, ScrollView, Text } from '../../components';
import { useNavigation } from '../../conversions';
import { spacing, useColors } from '../../features';

export const Account = () => {
  const { goBack } = useNavigation();
  const colors = useColors();

  return (
    <Screen
      onLeftPress={goBack}
      title="Account"
    >
      <ScrollView
        contentContainerStyle={{ padding: spacing(4) }}
        style={{ backgroundColor: colors.background.secondary }}
      >
        <Card>
          <Text
            center
            style={{ paddingBottom: spacing(4) }}
            title="Progress"
            type="h5"
          />
          <Calendar />
        </Card>
      </ScrollView>
    </Screen>
  );
};
