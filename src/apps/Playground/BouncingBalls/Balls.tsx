import React, { useCallback, useEffect, useState } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { v4 } from 'uuid';
import { Text } from '../../../components';
import { padding, SoundManager, useColor } from '../../../features';
import { CanvasDimensions } from './Canvas';
import { Item } from './types';
import {
  getItems,
  getOverlap,
  resolveBoundCollision,
  resolveItemCollision,
} from './utils';

type Props = {
  count: number;
  canvas: CanvasDimensions;
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
  minMass?: number;
  maxMass?: number;
  mitosis?: number;
};

export const Balls = ({
  count,
  canvas,
  minSize = 50,
  maxSize = 50,
  minSpeed = 1,
  maxSpeed = 5,
  minMass = 1,
  maxMass = 1,
  mitosis = 0.1,
}: Props): JSX.Element => {
  const color = useColor();

  const [items, setItems] = useState<Item[]>(() =>
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
        const a = prev[i];
        for (let j = i + 1; j < prev.length; j++) {
          const b = prev[j];
          if (getOverlap(a.x, a.y, a.radius, b.x, b.y, b.radius, true))
            resolveItemCollision(a, b, maxSpeed * 1.5);
        }
        resolveBoundCollision(a, canvas);
        a.x += a.dx;
        a.y += a.dy;
        a.position = new Animated.ValueXY({ x: a.x, y: a.y });
      }
      return [...prev];
    });
  }, [canvas, maxSpeed]);

  useEffect(() => {
    const interval = setInterval(draw);
    return () => clearInterval(interval);
  }, [draw]);

  const onPress = useCallback(
    ({ index }) =>
      () => {
        SoundManager.play('tap');
        setItems((prev) => {
          const item = prev[index];
          item.radius *= 1 - mitosis;
          item.dx *= 2 - mitosis;
          item.dy *= 2 - mitosis;
          const copy = { ...prev[index] };
          copy.dx *= -1;
          copy.dy *= -1;
          return [...prev, copy];
        });
      },
    [mitosis],
  );

  return (
    <>
      {items.map((item, index) => (
        <Animated.View key={v4()} style={item.position.getLayout()}>
          <TouchableOpacity
            onPress={onPress({ index })}
            style={{
              alignItems: 'center',
              borderColor: color.border.accent,
              borderWidth: 1,
              borderRadius: item.radius,
              flex: 1,
              padding: padding(1),
              height: item.radius * 2,
              justifyContent: 'center',
              position: 'absolute',
              width: item.radius * 2,
            }}
          >
            <Text adjustsFontSizeToFit title={String(index)} type="h3" />
          </TouchableOpacity>
        </Animated.View>
      ))}
    </>
  );
};
