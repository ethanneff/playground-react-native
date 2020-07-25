import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Screen} from '../../../components';
import {useColor, useNav} from '../../../hooks';

export default memo(function FlappyBird() {
  const color = useColor();
  const nav = useNav();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background,
    },
  });
  const navBack = useCallback(nav('portfolioLanding'), [nav]);
  return (
    <Screen onLeftPress={navBack} title="Flappy Bird">
      <View style={styles.container} />
    </Screen>
  );
});
