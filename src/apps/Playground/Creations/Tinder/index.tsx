import React from 'react';
import { StyleSheet } from 'react-native';
import { Screen, View } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { useColors } from '../../../../features';

export const Tinder = () => {
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
};
