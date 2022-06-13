import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from '../../../../components';
import { useColors, useLayout } from '../../../../features';
import { Game } from './Game';

export const PapiJump = memo(function PapiJump() {
  const colors = useColors();
  const { goBack } = useNavigation();
  const { layout, onLayout } = useLayout();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background.secondary,
      flex: 1,
    },
  });

  return (
    <Screen onLeftPress={goBack} title="Papi Jump">
      <View onLayout={onLayout} style={styles.container}>
        {layout ? <Game layout={layout} /> : null}
      </View>
    </Screen>
  );
});
