import React, {memo, useCallback} from 'react';
import {Button, Screen} from '../../../components';
import {useNav} from '../../../hooks';
import {Walkthrough} from './Walkthrough';

export const Landing = memo(function PortfolioLanding() {
  const nav = useNav();
  const navPortfolioLogin = useCallback(nav('login'), [nav]);

  return (
    <Screen title="Landing">
      <Walkthrough />
      <Button onPress={navPortfolioLogin} title="Login" />
    </Screen>
  );
});
