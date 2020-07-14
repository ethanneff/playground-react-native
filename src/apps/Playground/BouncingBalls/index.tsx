import React, {memo, useCallback, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {Screen, Text, TouchableOpacity} from '../../../components';
import {useColor, useNav} from '../../../hooks';
import {Canvas, CanvasDimensions} from './Canvas';
import {BouncingBall} from './BouncingBall';

const items = Array(30).fill(0);

export default memo(function PlaygroundBouncingBalls() {
  const nav = useNav();
  const [canvas, setCanvas] = useState<CanvasDimensions | null>(null);

  // TODO: make into hook
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
              <BouncingBall canvas={canvas} diameter={50} speed={3}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text inverse title={String(index)} type="h3" />
                </View>
              </BouncingBall>
            </TouchableOpacity>
          ))}
      </Canvas>
    </Screen>
  );
});
