import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Screen} from '../../../components';
import {useColor} from '../../../hooks';

export const Template = memo(function PlaygroundTemplate() {
  const color = useColor();
  const {goBack} = useNavigation();
  const navBack = useCallback(() => goBack(), [goBack]);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background,
    },
  });
  return (
    <Screen onLeftPress={navBack} title="Template">
      <View style={styles.container}>
        <View />
      </View>
    </Screen>
  );
});
