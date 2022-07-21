import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { Button, Screen, ScrollView } from '../../../components';
import { spacing, useAdminNavBack, useColors } from '../../../features';
import { PortfolioNavigation, PortfolioRoutes } from '../types';

export const Home = memo(function PortfolioHome() {
  const { navigate } = useNavigation<PortfolioNavigation>();
  const navTo = useCallback(
    (to: keyof PortfolioRoutes) => () => navigate(to),
    [navigate],
  );
  const { onLeftPress } = useAdminNavBack();
  const colors = useColors();
  return (
    <Screen
      dropShadow
      onLeftPress={onLeftPress}
      title="Home"
    >
      <ScrollView
        style={{
          padding: spacing(4),
          backgroundColor: colors.background.secondary,
        }}
      >
        <Button
          center
          onPress={navTo('login')}
          title="logout"
        />
        <Button
          center
          onPress={navTo('settings')}
          title="settings"
        />
        <Button
          center
          onPress={navTo('notFound')}
          title="not found"
        />
      </ScrollView>
    </Screen>
  );
});
