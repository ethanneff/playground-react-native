import React, {memo, useEffect, useRef, useCallback, useContext} from 'react';
import {Animated} from 'react-native';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {getPosition} from './utils';
import {DriftContext} from './Context';
import {CanvasDimensions} from './Game';
import {useNativeDriver} from '../../../../hooks';

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
  const position = new Animated.ValueXY(initialPositionRef.current);
  const useDriver = useNativeDriver();
  const {dispatch} = useContext(DriftContext);

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
        useNativeDriver: useDriver,
      }).start();
    },
    [canvas, dispatch, position, useDriver],
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
          shadowColor: 'black',
          shadowOffset: {
            height: 2,
            width: 0,
          },
          shadowOpacity,
          shadowRadius,
          zIndex: elevation,
          backgroundColor: 'coral',
        },
      ]}
    />
  );
});
