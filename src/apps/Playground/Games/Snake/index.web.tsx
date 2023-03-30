import React, { memo } from 'react';
import { Screen } from '../../../../components';
import { useNavigation } from '../../../../conversions';

export const Snake = memo(function Snake() {
  const { goBack } = useNavigation();

  return (
    <Screen
      onLeftPress={goBack}
      title="Snake"
    />
  );
});
