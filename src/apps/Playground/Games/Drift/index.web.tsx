import React, { memo } from 'react';
import { Screen } from '../../../../components';
import { useNavigation } from '../../../../conversions';

export const Drift = memo(function Drift() {
  const { goBack } = useNavigation();

  return (
    <Screen
      onLeftPress={goBack}
      title="Drift"
    />
  );
});
