import { Animated } from 'react-native';
import { CanvasDimensions, Item } from './types';

const rotate = (dx: number, dy: number, angle: number) => {
  return {
    x: dx * Math.cos(angle) - dy * Math.sin(angle),
    y: dx * Math.sin(angle) + dy * Math.cos(angle),
  };
};

export const resolveItemCollision = (
  particle: Item,
  otherParticle: Item,
  maxSpeed: number,
): void => {
  const xVelocityDiff = particle.dx - otherParticle.dx;
  const yVelocityDiff = particle.dy - otherParticle.dy;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    const angle = -Math.atan2(
      otherParticle.y - particle.y,
      otherParticle.x - particle.x,
    );

    // Store mass in var for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotate(particle.dx, particle.dy, angle);
    const u2 = rotate(otherParticle.dx, otherParticle.dy, angle);

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
    particle.dx = Math.min(vFinal1.x, maxSpeed);
    particle.dy = Math.min(vFinal1.y, maxSpeed);

    otherParticle.dx = Math.min(vFinal2.x, maxSpeed);
    otherParticle.dy = Math.min(vFinal2.y, maxSpeed);
  }
};

type OverlapProps = {
  aX: number;
  aY: number;
  aRadius: number;
  bX: number;
  bY: number;
  bRadius: number;
  center: boolean;
};

export const getOverlap = ({
  aX,
  aY,
  aRadius,
  bX,
  bY,
  bRadius,
  center,
}: OverlapProps): boolean => {
  const aCenter = { x: aX + aRadius, y: aY + aRadius };
  const bCenter = { x: bX + bRadius, y: bY + bRadius };
  const dx = center ? aCenter.x - bCenter.x : aX - bX;
  const dy = center ? aCenter.y - bCenter.y : aY - bY;
  const radius = aRadius + bRadius;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance <= radius;
};

export const getRandomNumber = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

type GetItems = {
  count: number;
  canvas: CanvasDimensions;
  minSize: number;
  maxSize: number;
  minSpeed: number;
  maxSpeed: number;
  minMass: number;
  maxMass: number;
};

export const getItems = ({
  count,
  canvas,
  minSize,
  maxSize,
  minSpeed,
  maxSpeed,
  minMass,
  maxMass,
}: GetItems): Item[] => {
  const initialItems: Item[] = [];

  for (let i = 0; i < count; i++) {
    const radius = getRandomNumber(minSize, maxSize);
    const mass = getRandomNumber(minMass, maxMass);
    const dx = getRandomNumber(-minSpeed, maxSpeed);
    const dy = getRandomNumber(-minSpeed, maxSpeed);
    let x = getRandomNumber(canvas.x, canvas.x + canvas.width - radius);
    let y = getRandomNumber(canvas.x, canvas.x + canvas.height - radius);

    if (i !== 0)
      for (let j = 0; j < initialItems.length; j++) {
        const item = initialItems[j];
        const overlap = getOverlap({
          aX: x,
          aY: y,
          aRadius: radius,
          bX: item.x,
          bY: item.y,
          bRadius: item.radius,
          center: false,
        });
        if (overlap) {
          x = getRandomNumber(canvas.x, canvas.x + canvas.width - radius);
          y = getRandomNumber(canvas.x, canvas.x + canvas.height - radius);
          j = -1;
        }
      }

    initialItems.push({
      index: i,
      x,
      y,
      dx,
      dy,
      radius,
      mass,
      position: new Animated.ValueXY({ x, y }),
    });
  }

  return initialItems;
};

export const resolveBoundCollision = (
  item: Item,
  canvas: CanvasDimensions,
): void => {
  if (item.x <= canvas.x) {
    item.dx = -item.dx;
    item.x = canvas.x;
  }
  if (item.x + 2 * item.radius >= canvas.x + canvas.width) {
    item.dx = -item.dx;
    item.x = canvas.x + canvas.width - 2 * item.radius;
  }
  if (item.y <= canvas.y) {
    item.dy = -item.dy;
    item.y = canvas.y;
  }
  if (item.y + 2 * item.radius >= canvas.y + canvas.height) {
    item.dy = -item.dy;
    item.y = canvas.y + canvas.height - 2 * item.radius;
  }
};
