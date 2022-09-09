import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { Button, Screen, ScrollView } from '../../../components';
import { spacing, useColors } from '../../../features';

export const NotFound = memo(function PortfolioNotFound() {
  const { goBack } = useNavigation();
  const colors = useColors();

  return (
    <Screen
      dropShadow
      title="404 :("
    >
      <ScrollView
        style={{
          backgroundColor: colors.background.secondary,
          padding: spacing(4),
        }}
      >
        <Button
          center
          onPress={goBack}
          title="go back"
        />
      </ScrollView>
    </Screen>
  );
});
