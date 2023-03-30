import React, { memo, useCallback, useState } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  type LayoutChangeEvent,
  type PanResponderGestureState,
  type PanResponderInstance,
} from 'react-native';
import { Screen, Text, View } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import {
  spacing,
  useColors,
  useDriver,
  useDropShadow,
} from '../../../../features';

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
  const colors = useColors();
  const dropShadow = useDropShadow();
  const useNativeDriver = useDriver();
  const [canvas, setCanvas] = useState({ height: 0, width: 0, x: 0, y: 0 });
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
      backgroundColor: colors.background.secondary,
      flex: 1,
    },
  });
  const ballPosition: Animated.ValueXY = new Animated.ValueXY(initialPosition);
  const panGesture: PanResponderInstance = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderEnd: () => {
      Animated.spring(ballPosition, {
        toValue: initialPosition,
        useNativeDriver,
      }).start();
    },
    onPanResponderMove: (_, gestureState) => {
      const toValue = getPosition(gestureState, initialPosition, size);
      Animated.spring(ballPosition, {
        toValue,
        useNativeDriver,
      }).start();
    },
  });

  const handleCanvas = useCallback((event: LayoutChangeEvent) => {
    const { height, width, x, y } = event.nativeEvent.layout;
    setCanvas({ height, width, x, y });
  }, []);

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Drag"
    >
      <View
        onLayout={handleCanvas}
        style={styles.canvas}
      >
        <Text
          center
          style={{
            left: 0,
            padding: spacing(2),
            position: 'absolute',
            right: 0,
            top: 0,
          }}
          title="drag the circle"
          type="overline"
        />
        <Animated.View
          style={[ballPosition.getLayout(), styles.ball]}
          {...panGesture.panHandlers} // eslint-disable-line react/jsx-props-no-spreading
        />
      </View>
    </Screen>
  );
});
