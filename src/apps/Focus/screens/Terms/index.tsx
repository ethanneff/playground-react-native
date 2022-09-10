import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo } from 'react';
import { Screen, ScrollView, Text } from '../../../../components';
import { UnAuthStackRoutes } from '../../types';

export const Terms = memo(function Terms() {
  const { goBack } =
    useNavigation<StackNavigationProp<UnAuthStackRoutes, 'terms'>>();

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
