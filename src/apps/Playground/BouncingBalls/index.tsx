import React, {memo, useCallback, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {Screen} from '../../../components';
import {useNav} from '../../../hooks';
import {Canvas, CanvasDimensions} from './Canvas';
import {Balls} from './Balls';

export default memo(function PlaygroundBouncingBalls() {
  const nav = useNav();
  const [canvas, setCanvas] = useState<CanvasDimensions | null>(null);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const {x, y, height, width} = event.nativeEvent.layout;
    setCanvas({x, y, height, width});
  }, []);

  return (
    <Screen onLeftPress={nav.to('playground')} title="BouncingBalls">
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
