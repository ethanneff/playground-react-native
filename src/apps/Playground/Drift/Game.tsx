import React, {memo, useCallback, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {CanvasDimensions} from '../BouncingBalls/Canvas';
import {Canvas} from './Canvas';
import {Character} from './Character';
import {Tracks} from './Tracks';

export const Game = memo(function Game() {
  const [canvas, setCanvas] = useState<CanvasDimensions | null>(null);

  const onCanvasLayout = useCallback((event: LayoutChangeEvent) => {
    const {x, y, height, width} = event.nativeEvent.layout;
    setCanvas({x, y, height, width});
  }, []);

  return (
    <Canvas onLayout={onCanvasLayout}>
      {canvas && (
        <>
          <Character canvas={canvas} />
          <Tracks />
        </>
      )}
    </Canvas>
  );
});
