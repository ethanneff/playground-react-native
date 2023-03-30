import React, { memo, useCallback, useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  type LayoutChangeEvent,
  type PanResponderInstance,
} from 'react-native';
import { Screen, View } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { colorWithOpacity, useColors, useDriver } from '../../../../features';
import { useRootSelector } from '../../../../redux';

const charSize = 50;
const charSpeed = 40;
const fps = 1000 / 60;

const getLimit = (value: number, limit: number) =>
  value > limit ? limit : value < -limit ? -limit : value;
const getBounds = (value: number, limit: number, size: number) =>
  value > limit - size ? limit - size : value < 0 ? 0 : value;

export const Archero = memo(function Archero() {
  const colors = useColors();
  const { goBack } = useNavigation();
  const useNativeDriver = useDriver();
  const timer = useRef(false);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const gesture = useRef({ dx: 0, dy: 0, x0: 0, y0: 0 });
  const window = useRootSelector((state) => state.device.dimensions.window);
  const [dimensions, setDimensions] = useState({ height: 1000, width: 1000 });
  const { height, width } = dimensions;
  const smallest = width > height ? height : width;
  const joystickSize = smallest / 3;
  const joystickCenter = joystickSize / 2;
  const thumbSize = joystickSize / 3;
  const initialJoystickLoc = {
    x: width / 2 - joystickCenter,
    y: height - joystickSize - 75,
  };
  const initialCharLoc = {
    x: width / 2 - charSize / 2,
    y: height / 2 - charSize / 2,
  };
  const initialThumbLoc = { x: 0, y: 0 };
  let characterValueXY = initialCharLoc;
  const joystick: Animated.ValueXY = new Animated.ValueXY(initialJoystickLoc);
  const thumb: Animated.ValueXY = new Animated.ValueXY(initialThumbLoc);
  const character: Animated.ValueXY = new Animated.ValueXY(initialCharLoc);
  character.addListener(({ x, y }) => {
    characterValueXY = { x, y };
  });

  const moveCharacter = () => {
    const { dx, dy } = gesture.current;
    const vx = getLimit(dx, charSpeed);
    const vy = getLimit(dy, charSpeed);
    const x = getBounds(characterValueXY.x + vx, width, charSize);
    const y = getBounds(characterValueXY.y + vy, height, charSize);
    Animated.spring(character, {
      toValue: { x, y },
      useNativeDriver,
    }).start();
  };

  const moveThumb = () => {
    const { dx, dy } = gesture.current;
    const angle = Math.atan2(dx, dy);
    const dz = Math.sqrt(dx ** 2 + dy ** 2);
    const z = getLimit(dz, thumbSize);
    const x = z * Math.sin(angle);
    const y = z * Math.cos(angle);
    Animated.spring(thumb, {
      toValue: { x, y },
      useNativeDriver,
    }).start();
  };

  const moveJoystick = () => {
    const { x0, y0 } = gesture.current;
    const offset = window.height - dimensions.height;
    const offset2 = window.width - dimensions.width;
    const toValue = {
      x: x0 - joystickCenter - offset2 / 2,
      y: y0 - joystickCenter - offset / 2 - joystickSize / 1.5,
    };
    Animated.spring(joystick, { toValue, useNativeDriver }).start();
  };

  const resetJoystick = () => {
    Animated.spring(joystick, {
      toValue: initialJoystickLoc,
      useNativeDriver,
    }).start();
    Animated.spring(thumb, {
      toValue: initialThumbLoc,
      useNativeDriver,
    }).start();
  };

  const onUpdate = () => {
    interval.current = setInterval(() => {
      if (!timer.current) {
        if (interval.current) clearInterval(interval.current);

        resetJoystick();
        return;
      }
      moveJoystick();
      moveCharacter();
      moveThumb();
    }, fps);
  };

  const panGesture: PanResponderInstance = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (_, g) => {
      gesture.current = { dx: g.dx, dy: g.dy, x0: g.x0, y0: g.y0 };
    },
    onPanResponderRelease: () => {
      timer.current = false;
    },
    onPanResponderStart: (_, g) => {
      timer.current = true;
      gesture.current = { dx: g.dx, dy: g.dy, x0: g.x0, y0: g.y0 };
      onUpdate();
    },
    onStartShouldSetPanResponder: () => true,
  });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent;
    setDimensions({ height: layout.height, width: layout.width });
  }, []);

  return (
    <Screen
      onLeftPress={goBack}
      title="Archero"
    >
      <View
        onLayout={onLayout}
        style={{ backgroundColor: colors.background.tertiary, flex: 1 }}
        {...panGesture.panHandlers} // eslint-disable-line react/jsx-props-no-spreading
      >
        <Animated.View
          style={[
            character.getLayout(),
            {
              backgroundColor: colors.background.accent,
              height: charSize,
              width: charSize,
            },
          ]}
        />
        <Animated.View
          style={[
            joystick.getLayout(),
            {
              alignItems: 'center',
              backgroundColor: colors.overlay.light,
              borderRadius: 500,
              height: joystickSize,
              justifyContent: 'center',
              width: joystickSize,
            },
          ]}
        >
          <View
            style={{
              alignItems: 'center',
              backgroundColor: colors.overlay.light,
              borderRadius: 500,
              height: thumbSize,
              justifyContent: 'center',
              width: thumbSize,
            }}
          >
            <Animated.View
              style={[
                thumb.getLayout(),
                {
                  backgroundColor: colorWithOpacity(
                    colors.background.accent,
                    0.8,
                  ),
                  borderRadius: 500,
                  height: thumbSize,
                  width: thumbSize,
                },
              ]}
            />
          </View>
        </Animated.View>
      </View>
    </Screen>
  );
});
