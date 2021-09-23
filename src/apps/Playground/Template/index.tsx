import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from '../../../components';
import { useColor } from '../../../features';

export const Template = memo(function PlaygroundTemplate() {
  const color = useColor();
  const { goBack } = useNavigation();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background.primaryA,
    },
  });
  return (
    <Screen onLeftPress={goBack} title="Template">
      <View style={styles.container}>
        <View />
      </View>
    </Screen>
  );
});
