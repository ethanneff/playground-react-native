import React, { memo } from "react";
import {
  Animated,
  PanResponder,
  PanResponderInstance,
  View
} from "react-native";
import { useColor } from "../../../hooks";
import { useRootSelector, colorWithOpacity } from "../../../utils";
import { getSmallestDimension } from "../../../models";

const charSize = 50;
const charSpeed = 40;

const getVelocity = (value: number, limit: number) =>
  value > limit ? limit : value < -limit ? -limit : value;
const getBounds = (value: number, limit: number, size: number) =>
  value > limit - size ? limit - size : value < 0 ? 0 : value;

export default memo(function Archero() {
  const color = useColor();
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

  const joystick: Animated.ValueXY = new Animated.ValueXY(initialJoystickLoc);
  const thumb: Animated.ValueXY = new Animated.ValueXY(initialThumbLoc);
  const character: Animated.ValueXY = new Animated.ValueXY(initialCharLoc);

  const moveCharacter = (dx: number, dy: number) => {
    const vx = getVelocity(dx, charSpeed);
    const vy = getVelocity(dy, charSpeed);
    const x = getBounds(character.x._value + vx, width, charSize);
    const y = getBounds(character.y._value + vy, height, charSize);
    Animated.spring(character, { toValue: { x, y } }).start();
  };

  const moveThumb = (dx: number, dy: number) => {
    const vx = getVelocity(dx, thumbSize);
    const vy = getVelocity(dy, thumbSize);
    Animated.spring(thumb, { toValue: { x: vx, y: vy } }).start();
  };

  const moveJoystick = (x0: number, y0: number) => {
    const toValue = { x: x0 - joystickCenter, y: y0 - joystickCenter };
    Animated.spring(joystick, { toValue }).start();
  };

  const resetJoystick = () => {
    Animated.spring(joystick, { toValue: initialJoystickLoc }).start();
    Animated.spring(thumb, { toValue: initialThumbLoc }).start();
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
    // <Screen onLeftPress={nav.to("portfolioLanding")} title="archero">
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
    // </Screen>
  );
});
