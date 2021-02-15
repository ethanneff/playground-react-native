import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Button, Screen} from '../../../components';
import {useAdminNavBack} from '../../../hooks';

// TODO: add state for login and logout

export const Home = memo(function PortfolioHome() {
  const {navigate} = useNavigation();
  const navTo = useCallback((to: string) => () => navigate(to), [navigate]);
  const {onLeftPress} = useAdminNavBack();
  return (
    <Screen gutter onLeftPress={onLeftPress} title="Home">
      <Button onPress={navTo('login')} title="logout" />
      <Button onPress={navTo('settings')} title="settings" />
      <Button onPress={navTo('notFound')} title="not found" />
    </Screen>
  );
});
