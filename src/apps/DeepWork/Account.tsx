import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { Calendar, Card, Screen, ScrollView, Text } from '../../components';
import { padding, useColors } from '../../features';

export const Account = memo(function Account() {
  const { goBack } = useNavigation();
  const colors = useColors();

  return (
    <Screen onLeftPress={goBack} title="Account">
      <ScrollView
        contentContainerStyle={{ padding: padding(4) }}
        style={{ backgroundColor: colors.background.secondary }}
      >
        <Card>
          <Text
            center
            style={{ paddingBottom: padding(4) }}
            title="Progress"
            type="h5"
          />
          <Calendar />
        </Card>
      </ScrollView>
    </Screen>
  );
});
