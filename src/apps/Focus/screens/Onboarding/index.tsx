import React from 'react';
import { Screen, ScrollView, Text } from '../../../../components';
import {
  useNavigation,
  type StackNavigationProp,
} from '../../../../conversions';
import { type UnAuthStackRoutes } from '../../types';

export const Onboarding = () => {
  const { goBack } = useNavigation<StackNavigationProp<UnAuthStackRoutes>>();

  return (
    <Screen
      onLeftPress={goBack}
      title="Begin your journey"
    >
      <ScrollView>
        <Text title="hello" />
      </ScrollView>
    </Screen>
  );
};
