import React from 'react';
import { Screen, ScrollView, Text } from '../../../../components';
import {
  useNavigation,
  type StackNavigationProp,
} from '../../../../conversions';
import { type UnAuthStackRoutes } from '../../types';

export const Terms = () => {
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
};
