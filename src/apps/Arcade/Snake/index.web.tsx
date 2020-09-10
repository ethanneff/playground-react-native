import React, {memo, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screen} from '../../../components';

export const Snake = memo(function Snake() {
  const {goBack} = useNavigation();
  const navBack = useCallback(() => goBack(), [goBack]);

  return <Screen onLeftPress={navBack} title="Snake" />;
});
