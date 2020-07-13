import {Animated} from 'react-native';
import {State} from './BouncingBall';
import {CanvasDimensions} from './Canvas';

const getRandomNumber = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

type GetSpeedProps = {
  state: State;
  canvas: CanvasDimensions;
  diameter: number;
  pulse: boolean;
};

export const getSpeed = ({state, canvas, diameter, pulse}: GetSpeedProps) => {
  const dMax = state.diameter >= diameter * 1.1;
  const dMin = state.diameter <= diameter * 0.9;
  // TODO: recenter so pulsing happens from middle
  const growing = dMax || dMin ? !state.growing : state.growing;
  const d = state.diameter + (!pulse ? 0 : growing ? 1 : -1);
  const xMin = canvas.x;
  const xMax = canvas.x + canvas.width;
  const yMin = canvas.y;
  const yMax = canvas.y + canvas.height;
  const xLarger = state.x + d >= xMax;
  const xSmaller = state.x <= xMin;
  const yLarger = state.y + d >= yMax;
  const ySmaller = state.y <= yMin;
  // TODO: add collision
  const xSpeed = xLarger || xSmaller ? -state.xSpeed : state.xSpeed;
  const ySpeed = yLarger || ySmaller ? -state.ySpeed : state.ySpeed;
  const x = xLarger ? xMax - d : xSmaller ? xMin : state.x + xSpeed;
  const y = yLarger ? yMax - d : ySmaller ? yMin : state.y + ySpeed;
  const dx = x + xSpeed;
  const dy = y + ySpeed;
  return {xSpeed, ySpeed, x: dx, y: dy, d, growing};
};

type GetInitialStateProps = {
  canvas: CanvasDimensions;
  diameter: number;
  speed: number;
};

export const getInitialState = ({
  canvas,
  diameter,
  speed,
}: GetInitialStateProps): State => {
  const starting = {
    x: getRandomNumber(canvas.x, canvas.x + canvas.width - diameter),
    y: getRandomNumber(canvas.y, canvas.y + canvas.height - diameter),
  };
  const growing = !!Math.floor(Math.random());
  return {
    ...starting,
    position: new Animated.ValueXY(starting),
    xSpeed: getRandomNumber(-speed, speed),
    ySpeed: getRandomNumber(-speed, speed),
    diameter,
    growing,
  };
};
