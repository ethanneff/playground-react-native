import React, { memo } from 'react';
import { Screen, ScrollView, Text } from '../../../../components';
import {
  useNavigation,
  type StackNavigationProp,
} from '../../../../conversions';
import { type UnAuthStackRoutes } from '../../types';

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
