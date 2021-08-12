import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Screen} from '../../../components';
import {useColor} from '../../../features';

export const Tinder = memo(function PlaygroundTinder() {
  const color = useColor();
  const {goBack} = useNavigation();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background.primaryA,
    },
  });

  return (
    <Screen onLeftPress={goBack} title="Tinder">
      <View style={styles.container} />
    </Screen>
  );
});
