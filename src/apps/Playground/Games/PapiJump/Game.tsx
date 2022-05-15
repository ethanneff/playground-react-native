import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { Button, Text } from '../../../../components';
import { LayoutDimensions, useColors, useDriver } from '../../../../features';

type Props = {
  duration?: number;
  layout: LayoutDimensions;
  radius?: number;
};

type PapiObject = {
  dx: number;
  dy: number;
  position: Animated.ValueXY;
  radius: number;
  x: number;
  y: number;
};

const getInitialPapiLocation = (
  layout: LayoutDimensions,
  radius: number,
): PapiObject => {
  const cord = { x: layout.width / 2 - radius, y: layout.height / 8 - radius };
  return {
    ...cord,
    dx: 0,
    dy: 10,
    position: new Animated.ValueXY(cord),
    radius,
  };
};

const getNextDraw = (
  layout: LayoutDimensions,
  papi: PapiObject,
): PapiObject => {
  const next = { ...papi };

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

export const Game = memo(function Game({
  layout,
  radius = 20,
  duration = 50,
}: Props) {
  const colors = useColors();
  const useNativeDriver = useDriver();
  const papi = useRef(getInitialPapiLocation(layout, radius));
  const [score, setScore] = useState(0);
  const [pause, setPause] = useState(false);

  const draw = useCallback(() => {
    const papiAnimation = Animated.timing(papi.current.position, {
      toValue: { x: papi.current.x, y: papi.current.y },
      duration,
      useNativeDriver,
    });

    if (pause) {
      papiAnimation.stop();
      return;
    }

    Animated.parallel([papiAnimation]).start(({ finished }) => {
      if (!finished) return;

      papi.current = getNextDraw(layout, papi.current);

      draw();
    });
  }, [duration, layout, pause, useNativeDriver]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handleOnPress = useCallback(() => {
    setPause((p) => !p);
    setScore((p) => p + 1);
  }, []);

  return (
    <>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          zIndex: 2,
          position: 'absolute',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <Text center title={String(score)} type="h2" />
        <View>
          <Button
            color={pause ? 'primaryA' : 'positive'}
            onPress={handleOnPress}
            title={pause ? 'pause' : 'start'}
          />
          <Button onPress={handleOnPress} title="reset" />
        </View>
      </View>
      <Animated.View
        style={{
          ...papi.current.position.getLayout(),
          position: 'absolute',
          height: radius * 2,
          width: radius * 2,
          borderRadius: radius,
          borderWidth: 1,
          justifyContent: 'center',
          backgroundColor: colors.tag.green,
          borderColor: colors.border.positive,
        }}
      />
    </>
  );
});
