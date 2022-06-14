import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { Button, Screen, ScrollView } from '../../../components';
import { padding, useColors } from '../../../features';

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
          padding: padding(4),
          backgroundColor: colors.background.secondary,
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
