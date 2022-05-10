import { Animated } from 'react-native';

export type Item = {
  dx: number;
  dy: number;
  index: number;
  mass: number;
  position: Animated.ValueXY;
  radius: number;
  x: number;
  y: number;
};
