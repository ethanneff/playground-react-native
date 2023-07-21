import React from 'react';
import { Button, Screen, ScrollView } from '../../../components';
import { useNavigation } from '../../../conversions';
import { spacing, useColors } from '../../../features';

export const NotFound = () => {
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
};
