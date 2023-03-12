import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { Button, Screen, ScrollView } from '../../../components';
import { spacing, useAdminNavBack, useColors } from '../../../features';
import { type PortfolioNavigation, type PortfolioRoutes } from '../types';

export const Home = memo(function PortfolioHome() {
  const { navigate } = useNavigation<PortfolioNavigation>();
  const navTo = useCallback(
    (to: keyof PortfolioRoutes) => () => {
      navigate(to);
    },
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
          backgroundColor: colors.background.secondary,
          padding: spacing(4),
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
