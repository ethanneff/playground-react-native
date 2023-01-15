import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { memo } from 'react';
import { Screen, ScrollView, Text } from '../../../../components';
import { type UnAuthStackRoutes } from '../../types';

export const Onboarding = memo(function Onboarding() {
  const { goBack } =
    useNavigation<NativeStackNavigationProp<UnAuthStackRoutes>>();

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
});
