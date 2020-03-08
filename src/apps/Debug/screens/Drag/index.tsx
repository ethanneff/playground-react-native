import React, { useState, useCallback } from "react";
import {
  Animated,
  PanResponder,
  PanResponderInstance,
  StyleSheet,
  View,
  LayoutChangeEvent,
  PanResponderGestureState
} from "react-native";
import { Screen, Text } from "../../../../components";
import { useColor, useNav, useDropShadow } from "../../../../hooks";

const getPosition = (
  gestureState: PanResponderGestureState,
  initialPosition: { x: number; y: number },
  size: number
) => {
  const maxY = gestureState.dy - initialPosition.y + size;
  const minY = gestureState.dy + initialPosition.y - size;
  const maxX = gestureState.dx - initialPosition.x + size;
  const minX = gestureState.dx + initialPosition.x - size;
  const y =
    minY <= 0
      ? size
      : maxY >= 0
      ? initialPosition.y * 2 - size
      : initialPosition.y + gestureState.dy;
  const x =
    minX <= 0
      ? size
      : maxX >= 0
      ? initialPosition.x * 2 - size
      : initialPosition.x + gestureState.dx;
  return { x, y };
};

export default function DebugDrag() {
  const nav = useNav();
  const color = useColor();
  const dropShadow = useDropShadow(10);
  const [canvas, setCanvas] = useState({ x: 0, y: 0, height: 0, width: 0 });
  const initialPosition = { x: canvas.width / 2, y: canvas.height / 2 };
  const size = 30;
  const styles = StyleSheet.create({
    ball: {
      borderColor: color.background,
      borderRadius: size,
      borderWidth: size,
      height: size,
      marginLeft: -size,
      marginTop: -size,
      width: size,
      ...dropShadow
    },
    canvas: {
      flex: 1,
      backgroundColor: color.surface
    }
  });
  const ballPosition: Animated.ValueXY = new Animated.ValueXY(initialPosition);
  const panGesture: PanResponderInstance = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (_, gestureState) => {
      const toValue = getPosition(gestureState, initialPosition, size);
      Animated.spring(ballPosition, { toValue }).start();
    },
    onPanResponderEnd: () => {
      Animated.spring(ballPosition, { toValue: initialPosition }).start();
    }
  });

  const handleCanvas = useCallback((event: LayoutChangeEvent) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setCanvas({ x, y, height, width });
  }, []);

  return (
    <Screen onLeftPress={nav.to("debug")} title="Drag">
      <Text overline center title="drag the circle" />
      <View style={styles.canvas} onLayout={handleCanvas}>
        <Animated.View
          style={[ballPosition.getLayout(), styles.ball]}
          {...panGesture.panHandlers}
        />
      </View>
    </Screen>
  );
}
