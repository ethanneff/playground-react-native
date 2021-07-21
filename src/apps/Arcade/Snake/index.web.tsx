import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {Screen} from '../../../components';

export const Snake = memo(function Snake() {
  const {goBack} = useNavigation();

  return <Screen onLeftPress={goBack} title="Snake" />;
});
