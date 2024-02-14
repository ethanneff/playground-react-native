import React from 'react';
import { Screen, ScrollView, Text } from '../../../../components';
import {
  type StackNavigationProperty,
  useNavigation,
} from '../../../../conversions';
import { type UnAuthStackRoutes } from '../../types';

export const Terms = () => {
  const { goBack } =
    useNavigation<StackNavigationProperty<UnAuthStackRoutes, 'terms'>>();

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
};
