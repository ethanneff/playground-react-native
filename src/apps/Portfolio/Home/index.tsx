import React, {memo, useCallback} from 'react';
import {Button, Screen} from '../../../components';
import {useNav} from '../../../hooks';

export const Home = memo(function PortfolioHome() {
  const nav = useNav();
  const navTo = useCallback((to: string) => nav(to), [nav]);
  return (
    <Screen gutter title="Home">
      <Button onPress={navTo('login')} title="logout" />
      <Button onPress={navTo('settings')} title="settings" />
      <Button onPress={navTo('notFound')} title="not found" />
    </Screen>
  );
});
