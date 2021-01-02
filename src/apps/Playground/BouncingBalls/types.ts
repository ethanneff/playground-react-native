import {Animated} from 'react-native';

export type Item = {
  index: number;
  position: Animated.ValueXY;
  dx: number;
  dy: number;
  x: number;
  y: number;
  radius: number;
  mass: number;
};

export type CanvasDimensions = {
  x: number;
  y: number;
  width: number;
  height: number;
};
