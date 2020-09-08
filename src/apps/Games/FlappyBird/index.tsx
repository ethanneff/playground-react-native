import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {Screen} from '../../../components';
import {useColor} from '../../../hooks';

export const FlappyBird = memo(function FlappyBird() {
  const color = useColor();
  const {goBack} = useNavigation();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background,
    },
  });
  const navBack = useCallback(() => goBack(), [goBack]);
  return (
    <Screen onLeftPress={navBack} title="Flappy Bird">
      <View style={styles.container} />
    </Screen>
  );
});
