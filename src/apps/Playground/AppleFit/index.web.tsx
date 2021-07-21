import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {Screen} from '../../../components';

export const AppleFit = memo(function PlaygroundAppleFit() {
  const {goBack} = useNavigation();

  return <Screen onLeftPress={goBack} title="Apple Fit" />;
});
