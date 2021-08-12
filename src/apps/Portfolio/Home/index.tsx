import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {ScrollView} from 'react-native';
import {Button, Screen} from '../../../components';
import {padding, useAdminNavBack, useColor} from '../../../features';
import {PortfolioNavigation, PortfolioRoutes} from '../types';

export const Home = memo(function PortfolioHome() {
  const {navigate} = useNavigation<PortfolioNavigation>();
  const navTo = useCallback(
    (to: keyof PortfolioRoutes) => () => navigate(to),
    [navigate],
  );
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
