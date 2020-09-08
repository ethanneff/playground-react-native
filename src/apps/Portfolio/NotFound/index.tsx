import React, {memo, useCallback} from 'react';
import {useNavigation} from '@react-navigation/core';
import {Button, Screen} from '../../../components';

export const NotFound = memo(function PortfolioNotFound() {
  const {goBack} = useNavigation();
  const navBack = useCallback(() => goBack(), [goBack]);
  return (
    <Screen title="404 :(">
      <Button onPress={navBack} title="go back" />
    </Screen>
  );
});
