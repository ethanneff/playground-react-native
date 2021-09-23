import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { ScrollView } from 'react-native';
import { Button, Screen } from '../../../components';
import { padding, useColor } from '../../../features';

export const NotFound = memo(function PortfolioNotFound() {
  const { goBack } = useNavigation();
  const color = useColor();

  return (
    <Screen dropShadow title="404 :(">
      <ScrollView
        style={{
          padding: padding(4),
          backgroundColor: color.background.secondary,
        }}
      >
        <Button center onPress={goBack} title="go back" />
      </ScrollView>
    </Screen>
  );
});
