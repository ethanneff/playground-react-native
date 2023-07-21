import React, { useCallback } from 'react';
import { Button, Screen, ScrollView } from '../../../components';
import { useNavigation } from '../../../conversions';
import { spacing, useAdminNavBack, useColors } from '../../../features';
import { type PortfolioNavigation, type PortfolioRoutes } from '../types';

export const Home = () => {
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
};
