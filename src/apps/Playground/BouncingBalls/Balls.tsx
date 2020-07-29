import React, {useCallback, useEffect, useState} from 'react';
import {Animated} from 'react-native';
import {Text, TouchableOpacity} from '../../../components';
import {useColor} from '../../../hooks';
import {Theme} from '../../../utils';
import {CanvasDimensions} from './Canvas';
import {
  getItems,
  getOverlap,
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
          if (getOverlap(a.x, a.y, a.radius, b.x, b.y, b.radius, true)) {
            resolveItemCollision(a, b, maxSpeed * 1.5);
          }
        }
        resolveBoundCollision(a, canvas);
        a.x += a.dx;
        a.y += a.dy;
        a.position = new Animated.ValueXY({x: a.x, y: a.y});
      }
      return [...prev];
    });
  }, [canvas, maxSpeed]);

  useEffect(() => {
    const interval = setInterval(draw);
    return () => clearInterval(interval);
  }, [draw]);

  const onPress = useCallback(
    ({index}) => () => {
      setItems((prev) => {
        const item = prev[index];
        item.radius *= 1 - mitosis;
        item.dx *= 2 - mitosis;
        item.dy *= 2 - mitosis;
        const copy = {...prev[index]};
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
        <Animated.View key={index} style={item.position.getLayout()}>
          <TouchableOpacity
            onPress={onPress({index})}
            style={{
              alignItems: 'center',
              borderColor: color.primary,
              borderWidth: 1,
              borderRadius: item.radius,
              flex: 1,
              padding: Theme.padding.p01,
              height: item.radius * 2,
              justifyContent: 'center',
              position: 'absolute',
              width: item.radius * 2,
            }}>
            <Text adjustsFontSizeToFit title={String(index)} type="h3" />
          </TouchableOpacity>
        </Animated.View>
      ))}
    </>
  );
};
