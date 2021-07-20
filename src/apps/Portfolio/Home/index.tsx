import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {ScrollView} from 'react-native';
import {Button, Screen} from '../../../components';
import {useAdminNavBack, useColor} from '../../../hooks';
import {padding} from '../../../utils';

export const Home = memo(function PortfolioHome() {
  const {navigate} = useNavigation();
  const navTo = useCallback((to: string) => () => navigate(to), [navigate]);
  const {onLeftPress} = useAdminNavBack();
  const color = useColor();
  return (
    <Screen dropShadow onLeftPress={onLeftPress} title="Home">
      <ScrollView
        style={{
          padding: padding(4),
          backgroundColor: color.background.secondary,
        }}>
        <Button center onPress={navTo('login')} title="logout" />
        <Button center onPress={navTo('settings')} title="settings" />
        <Button center onPress={navTo('notFound')} title="not found" />
      </ScrollView>
    </Screen>
  );
});
