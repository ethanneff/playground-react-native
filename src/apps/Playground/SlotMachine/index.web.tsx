import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Screen} from '../../../components';

export const SlotMachine = memo(function SlotMachine() {
  const {goBack} = useNavigation();
  const navBack = useCallback(() => goBack(), [goBack]);

  return <Screen onLeftPress={navBack} title="Slot Machine" />;
});
