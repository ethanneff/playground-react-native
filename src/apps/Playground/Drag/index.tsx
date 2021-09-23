import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  PanResponder,
  PanResponderGestureState,
  PanResponderInstance,
  StyleSheet,
  View,
} from 'react-native';
import { Screen, Text } from '../../../components';
import { padding, useColor, useDriver, useDropShadow } from '../../../features';

const getPosition = (
  gestureState: PanResponderGestureState,
  initialPosition: { x: number; y: number },
  size: number,
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

export const Drag = memo(function PlaygroundDrag() {
  const { goBack } = useNavigation();
  const color = useColor();
  const dropShadow = useDropShadow();
  const useNativeDriver = useDriver();
  const [canvas, setCanvas] = useState({ x: 0, y: 0, height: 0, width: 0 });
  const initialPosition = { x: canvas.width / 2, y: canvas.height / 2 };
  const size = 30;
  const styles = StyleSheet.create({
    ball: {
      borderRadius: size,
      borderWidth: size,
      height: size,
      marginLeft: -size,
      marginTop: -size,
      width: size,
      ...dropShadow(5),
    },
    canvas: {
      backgroundColor: color.background.secondary,
      flex: 1,
    },
  });
  const ballPosition: Animated.ValueXY = new Animated.ValueXY(initialPosition);
  const panGesture: PanResponderInstance = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (_, gestureState) => {
      const toValue = getPosition(gestureState, initialPosition, size);
      Animated.spring(ballPosition, {
        toValue,
        useNativeDriver,
      }).start();
    },
    onPanResponderEnd: () => {
      Animated.spring(ballPosition, {
        toValue: initialPosition,
        useNativeDriver,
      }).start();
    },
  });

  const handleCanvas = useCallback((event: LayoutChangeEvent) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setCanvas({ x, y, height, width });
  }, []);

  return (
    <Screen dropShadow onLeftPress={goBack} title="Drag">
      <View onLayout={handleCanvas} style={styles.canvas}>
        <Text
          center
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            padding: padding(2),
          }}
          title="drag the circle"
          type="overline"
        />
        <Animated.View
          style={[ballPosition.getLayout(), styles.ball]}
          {...panGesture.panHandlers}
        />
      </View>
    </Screen>
  );
});
