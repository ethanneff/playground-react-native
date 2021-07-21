import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {Screen} from '../../../components';

export const SlotMachine = memo(function SlotMachine() {
  const {goBack} = useNavigation();

  return <Screen onLeftPress={goBack} title="Slot Machine" />;
});
