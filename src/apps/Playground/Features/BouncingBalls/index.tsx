import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Screen, View } from '../../../../components';
import { useColors, useLayout } from '../../../../features';
import { Balls } from './Balls';

export const BouncingBalls = memo(function BouncingBalls() {
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
    <Screen
      onLeftPress={goBack}
      title="Bouncing Balls"
    >
      <View
        onLayout={onLayout}
        style={styles.container}
      >
        {layout ? (
          <Balls
            collision
            count={2}
            layout={layout}
            radius={80}
          />
        ) : null}
      </View>
    </Screen>
  );
});
