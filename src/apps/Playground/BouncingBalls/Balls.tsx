import React, {useCallback, useEffect, useState} from 'react';
import {Animated} from 'react-native';
import {Text, TouchableOpacity} from '../../../components';
import {useColor} from '../../../hooks';
import {CanvasDimensions} from './Canvas';
import {
  getDistance,
  getItems,
  resolveBoundCollision,
  resolveItemCollision,
} from './utils';

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

type Props = {
  count: number;
  canvas: CanvasDimensions;
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
  minMass?: number;
  maxMass?: number;
};

const fps = 16;
export const Balls = ({
  count,
  canvas,
  minSize = 10,
  maxSize = 50,
  minSpeed = 5,
  maxSpeed = 10,
  minMass = 10,
  maxMass = 10,
}: Props) => {
  const color = useColor();
  const [items, setItems] = useState<Item[]>(
    getItems({
      count,
      canvas,
      minSize,
      maxSize,
      minSpeed,
      maxSpeed,
      minMass,
      maxMass,
    }),
  );

  const draw = useCallback(() => {
    setItems((prev) => {
      for (let i = 0; i < prev.length; i++) {
        let a = items[i];
        for (let j = i + 1; j < prev.length; j++) {
          let b = items[j];
          if (getDistance(a.x, a.y, b.x, b.y) - (a.radius + b.radius) < 0) {
            resolveItemCollision(a, b);
          }
        }
        resolveBoundCollision(a, canvas);
        a.x += a.dx;
        a.y += a.dy;
        a.position = new Animated.ValueXY({x: a.x, y: a.y});
      }
      return [...prev];
    });
  }, [canvas, items]);

  useEffect(() => {
    const interval = setInterval(() => draw(), fps);
    return () => clearInterval(interval);
  }, [draw]);

  const onPress = useCallback(
    ({index}) => () => {
      setItems((prev) => {
        let item = prev[index];
        item.mass *= 0.75;
        item.radius *= 0.75;
        item.dx *= 1.25;
        item.dy *= 1.25;
        let copy = {...prev[index]};
        copy.dx *= -1;
        copy.dy *= -1;
        return [...prev, copy];
      });
    },
    [],
  );
  return (
    <>
      {items.map((item, index) => (
        <Animated.View key={index} style={item.position.getLayout()}>
          <TouchableOpacity
            onPress={onPress({index})}
            style={{
              alignItems: 'center',
              backgroundColor: color.primary,
              borderRadius: item.radius,
              flex: 1,
              height: item.radius * 2,
              justifyContent: 'center',
              position: 'absolute',
              width: item.radius * 2,
            }}>
            <Text
              adjustsFontSizeToFit
              inverse
              title={String(index)}
              type="h3"
            />
          </TouchableOpacity>
        </Animated.View>
      ))}
    </>
  );
};
