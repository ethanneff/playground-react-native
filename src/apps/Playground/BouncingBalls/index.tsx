import React, {memo, useCallback, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {Screen, Text, TouchableOpacity} from '../../../components';
import {useNav} from '../../../hooks';
import {Canvas, CanvasDimensions} from './Canvas';
import {BouncingBall} from './BouncingBall';

const items = Array(10).fill(0);

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
        {canvas &&
          items.map((_, index) => (
            <TouchableOpacity key={index} style={{position: 'absolute'}}>
              <BouncingBall canvas={canvas} diameter={100} speed={3}>
                <Text center inverse title={String(index)} type="h1" />
              </BouncingBall>
            </TouchableOpacity>
          ))}
      </Canvas>
    </Screen>
  );
});
