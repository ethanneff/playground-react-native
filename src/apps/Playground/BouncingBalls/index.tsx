import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { Screen } from '../../../components';
import { Balls } from './Balls';
import { Canvas, CanvasDimensions } from './Canvas';

export const BouncingBalls = memo(function PlaygroundBouncingBalls() {
  const { goBack } = useNavigation();
  const [canvas, setCanvas] = useState<CanvasDimensions | null>(null);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setCanvas({ x, y, height, width });
  }, []);

  return (
    <Screen dropShadow onLeftPress={goBack} title="BouncingBalls">
      <Canvas onLayout={onLayout}>
        {canvas && (
          <Balls
            canvas={canvas}
            count={1}
            maxSize={canvas.width / 6}
            minSize={canvas.width / 6}
          />
        )}
      </Canvas>
    </Screen>
  );
});
