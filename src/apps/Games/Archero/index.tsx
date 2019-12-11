import React, { memo } from "react";
import {
  Animated,
  PanResponder,
  PanResponderInstance,
  View
} from "react-native";
import { useColor, useNativeDriver, useNav } from "../../../hooks";
import { useRootSelector, colorWithOpacity } from "../../../utils";
import { getSmallestDimension } from "../../../models";
import { Screen } from "../../../components";

const charSize = 50;
const charSpeed = 40;

const getLimit = (value: number, limit: number) =>
  value > limit ? limit : value < -limit ? -limit : value;
const getBounds = (value: number, limit: number, size: number) =>
  value > limit - size ? limit - size : value < 0 ? 0 : value;

export default memo(function Archero() {
  const color = useColor();
  const nav = useNav();
  const useDriver = useNativeDriver();
  const { width, height } = useRootSelector(state => state.dimension.window);
  const smallest = useRootSelector(getSmallestDimension);

  const joystickSize = smallest / 3;
  const joystickCenter = joystickSize / 2;
  const thumbSize = joystickSize / 3;
  const initialJoystickLoc = {
    x: width / 2 - joystickCenter,
    y: height - joystickSize - 50
  };
  const initialCharLoc = {
    x: width / 2 - charSize / 2,
    y: height / 2 - charSize / 2
  };
  const initialThumbLoc = { x: 0, y: 0 };
  let characterValueXY = initialCharLoc;
  const joystick: Animated.ValueXY = new Animated.ValueXY(initialJoystickLoc);
  const thumb: Animated.ValueXY = new Animated.ValueXY(initialThumbLoc);
  const character: Animated.ValueXY = new Animated.ValueXY(initialCharLoc);
  character.addListener(({ x, y }) => {
    characterValueXY = { x, y };
  });

  const moveCharacter = (dx: number, dy: number) => {
    const vx = getLimit(dx, charSpeed);
    const vy = getLimit(dy, charSpeed);
    const x = getBounds(characterValueXY.x + vx, width, charSize);
    const y = getBounds(characterValueXY.y + vy, height, charSize);
    Animated.spring(character, {
      toValue: { x, y },
      useNativeDriver: useDriver
    }).start();
  };

  const moveThumb = (dx: number, dy: number) => {
    const vx = getLimit(dx, thumbSize);
    const vy = getLimit(dy, thumbSize);
    const zy = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
    console.log(vx, vy, thumbSize, zy);

    // Math.pow(thumbSize, 2) = Math.pow(vx, 2) + Math.pow(y, 2)

    Animated.spring(thumb, {
      toValue: { x: vx, y: vy },
      useNativeDriver: useDriver
    }).start();
  };

  const moveJoystick = (x0: number, y0: number) => {
    const toValue = { x: x0 - joystickCenter, y: y0 - joystickCenter };
    Animated.spring(joystick, { toValue, useNativeDriver: useDriver }).start();
  };

  const resetJoystick = () => {
    Animated.spring(joystick, {
      toValue: initialJoystickLoc,
      useNativeDriver: useDriver
    }).start();
    Animated.spring(thumb, {
      toValue: initialThumbLoc,
      useNativeDriver: useDriver
    }).start();
  };

  const panGesture: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderStart: (_, gestureState) => {
      moveJoystick(gestureState.x0, gestureState.y0);
    },
    onPanResponderMove: (_, gestureState) => {
      moveCharacter(gestureState.dx, gestureState.dy);
      moveThumb(gestureState.dx, gestureState.dy);
    },
    onPanResponderRelease: () => {
      resetJoystick();
    }
  });

  return (
    <Screen onLeftPress={nav.to("portfolioLanding")} title="archero">
      <View
        style={[{ flex: 1, backgroundColor: color.success }]}
        {...panGesture.panHandlers}
      >
        <Animated.View
          style={[
            character.getLayout(),
            {
              position: "absolute",
              width: charSize,
              height: charSize,
              backgroundColor: color.brand
            }
          ]}
        />
        <Animated.View
          style={[
            joystick.getLayout(),
            {
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 500,
              width: joystickSize,
              height: joystickSize,
              backgroundColor: colorWithOpacity(color.black, 0.2)
            }
          ]}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 500,
              width: thumbSize,
              height: thumbSize,
              backgroundColor: colorWithOpacity(color.black, 0.2)
            }}
          >
            <Animated.View
              style={[
                thumb.getLayout(),
                {
                  borderRadius: 500,
                  width: thumbSize,
                  height: thumbSize,
                  backgroundColor: colorWithOpacity(color.brand, 0.8)
                }
              ]}
            ></Animated.View>
          </View>
        </Animated.View>
      </View>
    </Screen>
  );
});
