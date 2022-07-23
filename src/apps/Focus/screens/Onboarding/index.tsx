import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo } from 'react';
import { Screen, ScrollView, Text } from '../../../../components';
import { UnAuthStackRoutes } from '../../types';

export const Onboarding = memo(function Onboarding() {
  const { goBack } = useNavigation<StackNavigationProp<UnAuthStackRoutes>>();

  return (
    <Screen
      onLeftPress={goBack}
      title="Begin your journey"
    >
      <ScrollView>
        <Text title="ehlleo" />
      </ScrollView>
    </Screen>
  );
});
