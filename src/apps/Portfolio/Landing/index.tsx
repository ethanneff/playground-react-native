import React, {memo, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, Screen} from '../../../components';
import {Walkthrough} from './Walkthrough';

export const Landing = memo(function PortfolioLanding() {
  const {navigate, goBack} = useNavigation();
  const navPortfolioLogin = useCallback(() => navigate('login'), [navigate]);
  const navBack = useCallback(() => goBack(), [goBack]);

  return (
    <Screen onLeftPress={navBack} title="Landing">
      <Walkthrough />
      <Button onPress={navPortfolioLogin} title="Login" />
    </Screen>
  );
});
