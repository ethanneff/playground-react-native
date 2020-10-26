import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Screen} from '../../../components';

export const AppleFit = memo(function PlaygroundAppleFit() {
  const {goBack} = useNavigation();
  const navBack = useCallback(() => goBack(), [goBack]);

  return <Screen onLeftPress={navBack} title="Apple Fit" />;
});
