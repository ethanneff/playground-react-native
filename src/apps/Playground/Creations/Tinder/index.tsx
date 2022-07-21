import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Screen, View } from '../../../../components';
import { useColors } from '../../../../features';

export const Tinder = memo(function PlaygroundTinder() {
  const colors = useColors();
  const { goBack } = useNavigation();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background.primaryA,
    },
  });

  return (
    <Screen
      onLeftPress={goBack}
      title="Tinder"
    >
      <View style={styles.container} />
    </Screen>
  );
});
