import React, {ReactNode, memo, useCallback, useEffect, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {useColor} from '../../../hooks';
import {CanvasDimensions} from './Canvas';
import {getInitialState, getSpeed} from './utils';

export type State = {
  position: Animated.ValueXY;
  xSpeed: number;
  ySpeed: number;
  x: number;
  y: number;
  diameter: number;
  growing: boolean;
};

// TODO: add min and max speed, min and max size, explosion handler
type Props = {
  speed?: number;
  canvas: CanvasDimensions;
  diameter?: number;
  children?: ReactNode;
  pulse?: boolean;
};

export const BouncingBall = memo(function BouncingBall({
  speed = 3,
  canvas,
  diameter = 30,
  children,
  pulse = false,
}: Props) {
  const color = useColor();
  const [state, setState] = useState<State>(
    getInitialState({canvas, diameter, speed}),
  );
  const styles = StyleSheet.create({
    ball: {
      backgroundColor: color.primary,
      borderRadius: state.diameter,
      height: state.diameter,
      position: 'absolute',
      width: state.diameter,
    },
  });
  const style = [styles.ball, state.position.getLayout()];

  const move = useCallback(() => {
    setState((s) => {
      const {xSpeed, ySpeed, x, y, d, growing} = getSpeed({
        state: s,
        canvas,
        diameter,
        pulse,
      });
      return {
        xSpeed,
        ySpeed,
        x,
        y,
        diameter: d,
        growing,
        position: new Animated.ValueXY({x, y}),
      };
    });
  }, [canvas, diameter, pulse]);

  useEffect(() => {
    const interval = setInterval(() => move(), 16);
    return () => {
      clearInterval(interval);
    };
  }, [move]);

  return <Animated.View style={style}>{children}</Animated.View>;
});
