import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useRef, useState} from 'react';
import {
  Animated,
  LayoutChangeEvent,
  PanResponder,
  PanResponderInstance,
  View,
} from 'react-native';
import {Screen} from '../../../components';
import {useColor, useDriver} from '../../../hooks';
import {colorWithOpacity, useRootSelector} from '../../../utils';

const charSize = 50;
const charSpeed = 40;
const fps = 1000 / 60;

const getLimit = (value: number, limit: number) =>
  value > limit ? limit : value < -limit ? -limit : value;
const getBounds = (value: number, limit: number, size: number) =>
  value > limit - size ? limit - size : value < 0 ? 0 : value;

export const Archero = memo(function Archero() {
  const color = useColor();
  const {goBack} = useNavigation();
  const useNativeDriver = useDriver();
  const timer = useRef(false);
  const interval = useRef<number | null>(null);
  const gesture = useRef({x0: 0, y0: 0, dx: 0, dy: 0});
  const window = useRootSelector(state => state.dimension.window);
  const [dimensions, setDimensions] = useState({width: 1000, height: 1000});
  const {width, height} = dimensions;
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
  const initialThumbLoc = {x: 0, y: 0};
  let characterValueXY = initialCharLoc;
  const joystick: Animated.ValueXY = new Animated.ValueXY(initialJoystickLoc);
  const thumb: Animated.ValueXY = new Animated.ValueXY(initialThumbLoc);
  const character: Animated.ValueXY = new Animated.ValueXY(initialCharLoc);
  character.addListener(({x, y}) => {
    characterValueXY = {x, y};
  });

  const moveCharacter = () => {
    const {dx, dy} = gesture.current;
    const vx = getLimit(dx, charSpeed);
    const vy = getLimit(dy, charSpeed);
    const x = getBounds(characterValueXY.x + vx, width, charSize);
    const y = getBounds(characterValueXY.y + vy, height, charSize);
    Animated.spring(character, {
      toValue: {x, y},
      useNativeDriver,
    }).start();
  };

  const moveThumb = () => {
    const {dx, dy} = gesture.current;
    const angle = Math.atan2(dx, dy);
    const dz = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    const z = getLimit(dz, thumbSize);
    const x = z * Math.sin(angle);
    const y = z * Math.cos(angle);
    Animated.spring(thumb, {
      toValue: {x, y},
      useNativeDriver,
    }).start();
  };

  const moveJoystick = () => {
    const {x0, y0} = gesture.current;
    const offset = window.height - dimensions.height;
    const offset2 = window.width - dimensions.width;
    // TODO: handle joystick location better in landscape
    const toValue = {
      x: x0 - joystickCenter - offset2 / 2,
      y: y0 - joystickCenter - offset / 2 - joystickSize / 1.5,
    };
    Animated.spring(joystick, {toValue, useNativeDriver}).start();
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

  const panGesture: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderStart: (_, g) => {
      timer.current = true;
      gesture.current = {x0: g.x0, y0: g.y0, dx: g.dx, dy: g.dy};
      onUpdate();
    },
    onPanResponderMove: (_, g) => {
      gesture.current = {x0: g.x0, y0: g.y0, dx: g.dx, dy: g.dy};
    },
    onPanResponderRelease: () => {
      timer.current = false;
    },
  });

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

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;
    setDimensions({width: layout.width, height: layout.height});
  }, []);

  const navBack = useCallback(() => goBack(), [goBack]);

  return (
    <Screen onLeftPress={navBack} title="Archero">
      <View
        onLayout={onLayout}
        style={{flex: 1, backgroundColor: color.success}}
        {...panGesture.panHandlers}>
        <Animated.View
          style={[
            character.getLayout(),
            {
              width: charSize,
              height: charSize,
              backgroundColor: color.brand,
            },
          ]}
        />
        <Animated.View
          style={[
            joystick.getLayout(),
            {
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 500,
              width: joystickSize,
              height: joystickSize,
              backgroundColor: color.overlay,
            },
          ]}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 500,
              width: thumbSize,
              height: thumbSize,
              backgroundColor: color.overlay,
            }}>
            <Animated.View
              style={[
                thumb.getLayout(),
                {
                  borderRadius: 500,
                  width: thumbSize,
                  height: thumbSize,
                  backgroundColor: colorWithOpacity(color.brand, 0.8),
                },
              ]}
            />
          </View>
        </Animated.View>
      </View>
    </Screen>
  );
});
