import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { View } from 'react-native';
import { Screen } from '../../../../components';
import { useCanvas } from '../../../../features';
import { Balls } from './Balls';

export const BouncingBalls = memo(function PlaygroundBouncingBalls() {
  const { goBack } = useNavigation();
  const { canvas, onLayout } = useCanvas();

  return (
    <Screen dropShadow onLeftPress={goBack} title="BouncingBalls">
      <View onLayout={onLayout}>
        {canvas && (
          <Balls
            canvas={canvas}
            count={1}
            maxSize={canvas.width / 6}
            minSize={canvas.width / 6}
          />
        )}
      </View>
    </Screen>
  );
});
