import { Animated } from 'react-native';
import { type LayoutDimensions } from '../../../../features';

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

const getRandomNumber = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

const rotate = (dx: number, dy: number, angle: number) => ({
  x: dx * Math.cos(angle) - dy * Math.sin(angle),
  y: dx * Math.sin(angle) + dy * Math.cos(angle),
});

export const getNextDraw = (item: Item, layout: LayoutDimensions): Item => {
  const next = { ...item };

  next.x += next.dx;
  next.y += next.dy;

  const top = next.x - layout.x;
  if (top <= 0) {
    next.dx = -next.dx;
    next.x = 0;
  }
  const right = layout.width - layout.x - next.x - next.radius * 2;
  if (right <= 0) {
    next.dx = -next.dx;
    next.x = layout.x + layout.width - next.radius * 2;
  }
  const left = next.y - layout.y;
  if (left <= 0) {
    next.dy = -next.dy;
    next.y = layout.y;
  }
  const bottom = layout.height - layout.y - next.y - next.radius * 2;
  if (bottom <= 0) {
    next.dy = -next.dy;
    next.y = layout.y + layout.height - next.radius * 2;
  }

  return next;
};

type GetInitialItemsProps = {
  count: number;
  layout: LayoutDimensions;
  radius: number;
  speed: number;
};

export const getInitialItems = ({
  count,
  layout,
  radius,
  speed,
}: GetInitialItemsProps): Item[] => {
  const items: Item[] = [];

  for (let i = 0; i < count; i++) {
    const coordinate = {
      x: getRandomNumber(layout.x, layout.x + layout.width - radius),
      y: getRandomNumber(layout.y, layout.y + layout.height - radius),
    };
    items.push({
      index: i,
      ...coordinate,
      dx: getRandomNumber(-speed, speed),
      dy: getRandomNumber(-speed, speed),
      mass: radius,
      position: new Animated.ValueXY(coordinate),
      radius,
    });
  }

  return items;
};

export const getItemOverlap = (a: Item, b: Item): boolean => {
  const ac = { x: a.x + a.radius, y: a.y + a.radius };
  const bc = { x: b.x + b.radius, y: b.y + b.radius };
  const distSq = (ac.x - bc.x) * (ac.x - bc.x) + (ac.y - bc.y) * (ac.y - bc.y);
  const radSq = (a.radius + b.radius) * (a.radius + b.radius);
  return distSq <= radSq;
};

// TODO: make better without velocity change
export const getItemCollision = (a: Item, b: Item, maxSpeed: number): void => {
  const xVelocityDiff = a.dx - b.dx;
  const yVelocityDiff = a.dy - b.dy;

  const xDist = b.x - a.x;
  const yDist = b.y - a.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    const angle = -Math.atan2(b.y - a.y, b.x - a.x);

    // Store mass in var for better readability in collision equation
    const m1 = a.mass;
    const m2 = b.mass;

    // Velocity before equation
    const u1 = rotate(a.dx, a.dy, angle);
    const u2 = rotate(b.dx, b.dy, angle);

    // Velocity after 1d collision equation
    const v1 = {
      dx: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      dy: u1.y,
    };
    const v2 = {
      dx: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m1) / (m1 + m2),
      dy: u2.y,
    };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1.dx, v1.dy, -angle);
    const vFinal2 = rotate(v2.dx, v2.dy, -angle);

    // Swap particle velocities for realistic bounce effect
    a.dx = Math.min(vFinal1.x, maxSpeed);
    a.dy = Math.min(vFinal1.y, maxSpeed);

    b.dx = Math.min(vFinal2.x, maxSpeed);
    b.dy = Math.min(vFinal2.y, maxSpeed);
  }
};
