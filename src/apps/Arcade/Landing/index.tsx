import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { Button, Screen, ScrollView } from '../../../components';
import { useAdminNavBack, useColors } from '../../../features';
import { ArcadeNavigation, arcadeScreens } from '../types';

export const Landing = memo(function Landing() {
  const colors = useColors();
  const { navigate } = useNavigation<ArcadeNavigation>();
  const { onLeftPress } = useAdminNavBack();
  const onPress = useCallback((screen) => () => navigate(screen), [navigate]);

  return (
    <Screen onLeftPress={onLeftPress} title="Arcade">
      <ScrollView style={{ backgroundColor: colors.background.secondary }}>
        {arcadeScreens.map((screen) => (
          <Button key={screen} onPress={onPress(screen)} title={screen} />
        ))}
      </ScrollView>
    </Screen>
  );
});
