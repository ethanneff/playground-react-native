import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { memo } from 'react';
import { Screen, ScrollView, Text } from '../../../../components';
import { type UnAuthStackRoutes } from '../../types';

export const Terms = memo(function Terms() {
  const { goBack } =
    useNavigation<NativeStackNavigationProp<UnAuthStackRoutes, 'terms'>>();

  return (
    <Screen
      onLeftPress={goBack}
      title="Terms of service"
    >
      <ScrollView>
        <Text title="hello" />
      </ScrollView>
    </Screen>
  );
});
