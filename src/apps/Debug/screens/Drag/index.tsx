import React from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  PanResponderInstance,
  StyleSheet
} from "react-native";
import { Screen, Text } from "../../../../components";
import { useColor, useNav } from "../../../../hooks";

export default function DebugDrag() {
  const nav = useNav();
  const color = useColor();
  const { width, height } = Dimensions.get("window");
  const styles = StyleSheet.create({
    ball: {
      borderColor: color.text,
      borderRadius: 30,
      borderWidth: 30,
      height: 60,
      marginLeft: -30,
      marginTop: -30,
      width: 60
    }
  });
  const ballPosition: Animated.ValueXY = new Animated.ValueXY({
    x: width / 2,
    y: height / 2
  });
  const panGesture: PanResponderInstance = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (_, gestureState) => {
      Animated.spring(ballPosition, {
        toValue: { x: gestureState.moveX, y: gestureState.moveY }
      }).start();
    }
  });

  return (
    <Screen onLeftPress={nav.to("debug")}>
      <Text center title="drag the circle" />
      <Animated.View
        style={[ballPosition.getLayout(), styles.ball]}
        {...panGesture.panHandlers}
      />
    </Screen>
  );
}
