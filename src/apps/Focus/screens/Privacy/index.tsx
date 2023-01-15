import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { memo } from 'react';
import { Screen, ScrollView, Text } from '../../../../components';
import { type UnAuthStackRoutes } from '../../types';

export const Privacy = memo(function Privacy() {
  const { goBack } =
    useNavigation<NativeStackNavigationProp<UnAuthStackRoutes, 'privacy'>>();

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
