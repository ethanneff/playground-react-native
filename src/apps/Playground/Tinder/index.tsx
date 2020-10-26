import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Screen} from '../../../components';
import {useColor} from '../../../hooks';

export const Tinder = memo(function PlaygroundTinder() {
  const color = useColor();
  const {goBack} = useNavigation();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background,
    },
  });
  const navBack = useCallback(() => goBack(), [goBack]);
  return (
    <Screen onLeftPress={navBack} title="Tinder">
      <View style={styles.container} />
    </Screen>
  );
});
