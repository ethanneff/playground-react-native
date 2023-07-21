import React from 'react';
import { Screen } from '../../../../components';
import { useNavigation } from '../../../../conversions';

export const SlotMachine = () => {
  const { goBack } = useNavigation();

  return (
    <Screen
      onLeftPress={goBack}
      title="Slot Machine"
    />
  );
};
