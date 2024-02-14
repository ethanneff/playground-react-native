import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import {
  SensorTypes,
  accelerometer,
  setUpdateIntervalForType,
} from 'react-native-sensors';
import { useColors, useDriver } from '../../../../features';
import { DriftContext } from './Context';
import { type CanvasDimensions } from './types';
import { getPosition } from './utils';

type CharacterProperties = {
  readonly canvas: CanvasDimensions;
};

export const Character = ({ canvas }: CharacterProperties) => {
  const elevation = 5;
  const size = 30;
  const speed = 6;
  const rate = 16;
  const shadowOpacity = elevation * 0.036 + 0.12;
  const shadowRadius = elevation * 0.36 + 1.2;
  const initialPositionReference = useRef({
    x: canvas.width / 2 - size,
    y: canvas.height / 2 - size,
  });
  const position = useRef(
    new Animated.ValueXY(initialPositionReference.current),
  ).current;
  const useNativeDriver = useDriver();
  const { dispatch } = useContext(DriftContext);
  const colors = useColors();

  const animate = useCallback(
    (dx: number, dy: number) => {
      const toValue = getPosition({
        canvas,
        change: { dx: dx * speed, dy: dy * speed },
        current: initialPositionReference.current,
        size,
      });
      initialPositionReference.current = toValue;
      dispatch({ payload: { ...toValue, size }, type: 'addTrack' });
      Animated.spring(position, {
        toValue,
        useNativeDriver,
      }).start();
    },
    [canvas, dispatch, position, useNativeDriver],
  );

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.accelerometer, rate);
    const accumulator = accelerometer.subscribe(({ x, y }) => {
      animate(x, y);
    });
    return () => {
      accumulator.unsubscribe();
    };
  }, [rate, animate]);

  return (
    <Animated.View
      style={[
        position.getLayout(),
        {
          backgroundColor: colors.background.accent,
          borderRadius: size,
          elevation,
          height: size,
          shadowColor: colors.background.primaryB,
          shadowOffset: {
            height: 2,
            width: 0,
          },
          shadowOpacity,
          shadowRadius,
          width: size,
          zIndex: elevation,
        },
      ]}
    />
  );
};
