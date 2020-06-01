import React, {memo, useCallback, useState} from 'react';
import {LayoutChangeEvent, View} from 'react-native';
import {Canvas} from './Canvas';
import {Dpad} from './Dpad';
import {Character} from './Character';
import {Tracks} from './Tracks';

export type CanvasDimensions = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const Game = memo(function Game() {
  const [canvas, setCanvas] = useState<CanvasDimensions | null>(null);

  const onCanvasLayout = useCallback((event: LayoutChangeEvent) => {
    const {x, y, height, width} = event.nativeEvent.layout;
    setCanvas({x, y, height, width});
  }, []);

  return (
    <View style={{flex: 1}}>
      <Canvas onLayout={onCanvasLayout}>
        {canvas && (
          <View>
            <Character canvas={canvas} />
            <Tracks />
          </View>
        )}
      </Canvas>
      <Dpad />
    </View>
  );
});
