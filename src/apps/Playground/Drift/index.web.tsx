import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Screen} from '../../../components';

export const Drift = memo(function Drift() {
  const {goBack} = useNavigation();
  const navBack = useCallback(() => goBack(), [goBack]);

  return <Screen onLeftPress={navBack} title="Drift" />;
});
