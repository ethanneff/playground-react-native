import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {Screen} from '../../../components';

export const Drift = memo(function Drift() {
  const {goBack} = useNavigation();

  return <Screen onLeftPress={goBack} title="Drift" />;
});
