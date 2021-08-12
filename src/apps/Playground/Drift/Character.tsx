import React, {memo, useCallback, useContext, useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {
  accelerometer,
  SensorTypes,
  setUpdateIntervalForType,
} from 'react-native-sensors';
import {useColor, useDriver} from '../../../features';
import {DriftContext} from './Context';
import {CanvasDimensions} from './types';
import {getPosition} from './utils';

type CharacterProps = {
  canvas: CanvasDimensions;
};

export const Character = memo(function Character({canvas}: CharacterProps) {
  const elevation = 5;
  const size = 30;
  const speed = 6;
  const rate = 16;
  const shadowOpacity = elevation * 0.036 + 0.12;
  const shadowRadius = elevation * 0.36 + 1.2;
  const initialPositionRef = useRef({
    x: canvas.width / 2 - size,
    y: canvas.height / 2 - size,
  });
  const position = useRef(
    new Animated.ValueXY(initialPositionRef.current),
  ).current;
  const useNativeDriver = useDriver();
  const {dispatch} = useContext(DriftContext);
  const color = useColor();

  const animate = useCallback(
    (dx: number, dy: number) => {
      const toValue = getPosition({
        canvas,
        change: {dx: dx * speed, dy: dy * speed},
        current: initialPositionRef.current,
        size,
      });
      initialPositionRef.current = toValue;
      dispatch({type: 'addTrack', payload: {...toValue, size}});
      Animated.spring(position, {
        toValue,
        useNativeDriver,
      }).start();
    },
    [canvas, dispatch, position, useNativeDriver],
  );

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.accelerometer, rate);
    const acc = accelerometer.subscribe(({x, y}) => animate(x, y));
    return () => {
      acc.unsubscribe();
    };
  }, [rate, animate]);

  return (
    <Animated.View
      style={[
        position.getLayout(),
        {
          width: size,
          height: size,
          borderRadius: size,
          elevation,
          shadowColor: color.background.primaryB,
          shadowOffset: {
            height: 2,
            width: 0,
          },
          shadowOpacity,
          shadowRadius,
          zIndex: elevation,
          backgroundColor: color.background.accent,
        },
      ]}
    />
  );
});
