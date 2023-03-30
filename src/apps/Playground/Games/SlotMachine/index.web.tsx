import React, { memo } from 'react';
import { Screen } from '../../../../components';
import { useNavigation } from '../../../../conversions';

export const SlotMachine = memo(function SlotMachine() {
  const { goBack } = useNavigation();

  return (
    <Screen
      onLeftPress={goBack}
      title="Slot Machine"
    />
  );
});
