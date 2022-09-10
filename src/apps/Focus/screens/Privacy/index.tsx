import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo } from 'react';
import { Screen, ScrollView, Text } from '../../../../components';
import { UnAuthStackRoutes } from '../../types';

export const Privacy = memo(function Privacy() {
  const { goBack } =
    useNavigation<StackNavigationProp<UnAuthStackRoutes, 'privacy'>>();

  return (
    <Screen
      onLeftPress={goBack}
      title="Privacy policy"
    >
      <ScrollView>
        <Text title="hello" />
      </ScrollView>
    </Screen>
  );
});
