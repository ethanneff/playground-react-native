import React, { useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { Screen, Text } from "../../../../components";
import { useNav, useColor } from "../../../../hooks";
import { usePanGesture } from "./usePanGesture";
import { GestureHandler } from "./logic";

const minTouches = 2;
const title = `pinch or spread the screen with ${minTouches} fingers minimum`;

export default function PinchSpread() {
  const [state, setState] = useState({
    pinchCount: 0,
    spreadCount: 0
  });
  const color = useColor();
  const nav = useNav();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.surface
    }
  });
  const gestureHandler = new GestureHandler({ minTouches });
  const panGesture = usePanGesture({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: event => {
      gestureHandler.onPanResponderMove(event);
    },
    onPanResponderRelease: () => {
      const { spreadCount, pinchCount } = state;
      // TODO: fix cannot read property of undefined when 2+ touches
      const outcome = gestureHandler.onPanResponderRelease();
      if (outcome.spread) {
        setState({ ...state, spreadCount: spreadCount + 1 });
      }
      if (outcome.pinch) {
        setState({ ...state, pinchCount: pinchCount + 1 });
      }
    }
  });

  if (!panGesture) {
    return <></>;
  }
  return (
    <Screen onLeftPress={nav.to("debug")}>
      <Text center title={title} />
      <Text center title={`spread: ${state.spreadCount}`} />
      <Text center title={`pinch: ${state.pinchCount}`} />
      <Animated.View style={styles.container} {...panGesture.panHandlers} />
    </Screen>
  );
}
