import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { Text, TouchableOpacity } from '../../../../components';
import { LayoutDimensions, useColors, useDriver } from '../../../../features';
import {
  getInitialItems,
  getItemCollision,
  getItemOverlap,
  getNextDraw,
} from './utils';

type Props = {
  collision?: boolean;
  count: number;
  difficulty?: number;
  layout: LayoutDimensions;
  radius: number;
  speed?: number;
};

export const Balls = memo(function Balls({
  radius,
  count,
  layout,
  speed = 5,
  difficulty = 0.8,
  collision,
}: Props) {
  const colors = useColors();
  const useNativeDriver = useDriver();
  const items = useRef(getInitialItems({ count, layout, radius, speed }));
  const [score, setScore] = useState(0);

  const draw = useCallback(() => {
    Animated.parallel(
      items.current.map((item) =>
        Animated.timing(item.position, {
          duration: 50,
          toValue: { x: item.x, y: item.y },
          useNativeDriver,
        }),
      ),
    ).start(({ finished }) => {
      if (!finished) return;
      // TODO: method
      // next step
      items.current = items.current.map((item) => getNextDraw(item, layout));

      // item collision
      if (collision) {
        for (let i = 0; i < items.current.length; i++) {
          const a = items.current[i];
          for (let j = i + 1; j < items.current.length; j++) {
            const b = items.current[j];
            const overlap = getItemOverlap(a, b);
            if (overlap) getItemCollision(a, b, speed);
          }
        }
      }

      draw();
    });
  }, [collision, layout, speed, useNativeDriver]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handlePress = useCallback(
    (index: number) => () => {
      const active = items.current[index];
      const multiplier = 1.5 + difficulty;

      // TODO updateCurrentItem()
      items.current[index] = {
        ...active,
        dx: active.dx * multiplier,
        dy: -active.dy * multiplier,
        radius: active.radius * difficulty,
      };

      // TODO addNewItem()
      const coordinates = { x: active.x, y: active.y };
      items.current.push({
        ...coordinates,
        dx: -active.dx * multiplier,
        dy: active.dy * multiplier,
        index: items.current.length,
        mass: 10,
        position: new Animated.ValueXY(coordinates),
        radius: active.radius * difficulty,
      });

      setScore((prev) => prev + 1);
    },
    [difficulty],
  );

  return (
    <>
      <Text
        center
        title={String(score)}
        type="h2"
      />
      {items.current.map((item) => (
        <Animated.View
          key={item.index}
          style={{
            ...item.position.getLayout(),
            position: 'absolute',
          }}
        >
          <TouchableOpacity
            onPress={handlePress(item.index)}
            style={{
              borderColor: colors.border.accent,
              borderRadius: item.radius,
              borderWidth: 1,
              height: item.radius * 2,
              justifyContent: 'center',
              width: item.radius * 2,
            }}
          >
            <Text
              adjustsFontSizeToFit
              center
              title={String(item.index)}
              type="h4"
            />
          </TouchableOpacity>
        </Animated.View>
      ))}
    </>
  );
});
