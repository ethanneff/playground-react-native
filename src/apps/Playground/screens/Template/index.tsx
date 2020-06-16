import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Screen} from '../../../../components';
import {useColor, useNav} from '../../../../hooks';

export default memo(function PlaygroundTemplate() {
  const color = useColor();
  const nav = useNav();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background,
    },
  });
  return (
    <Screen onLeftPress={nav.to('playground')} title="Template">
      <View style={styles.container}>
        <View />
      </View>
    </Screen>
  );
});
