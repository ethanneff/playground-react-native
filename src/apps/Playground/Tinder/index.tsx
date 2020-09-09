import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Screen} from '../../../components';
import {useColor, useNav} from '../../../hooks';

export const Tinder = memo(function PlaygroundTinder() {
  const color = useColor();
  const nav = useNav();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background,
    },
  });
  const navBack = useCallback(nav('landing'), [nav]);
  return (
    <Screen onLeftPress={navBack} title="Tinder">
      <View style={styles.container} />
    </Screen>
  );
});
