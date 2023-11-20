import React, { useEffect, useRef } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  type PanResponderGestureState,
} from 'react-native';
import { Screen, Text, View } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import {
  spacing,
  useColors,
  useDriver,
  useDropShadow,
  useLayout,
} from '../../../../features';

const getBoundedPosition = (
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

const size = 30;
export const Drag = () => {
  const { goBack } = useNavigation();
  const colors = useColors();
  const dropShadow = useDropShadow();
  const useNativeDriver = useDriver();
  const { layout, onLayout } = useLayout();
  const initialPosition = useRef({ x: 0, y: 0 });
  const ballPosition = useRef(new Animated.ValueXY(initialPosition.current));
  const opacity = useRef(new Animated.Value(0));
  const styles = StyleSheet.create({
    ball: {
      borderRadius: size,
      borderWidth: size,
      height: size,
      marginLeft: -size,
      marginTop: -size,
      position: 'absolute',
      width: size,
      ...dropShadow(5),
    },
    canvas: {
      backgroundColor: colors.background.secondary,
      flex: 1,
    },
  });

  useEffect(() => {
    if (!layout) return;
    initialPosition.current = { x: layout.width / 2, y: layout.height / 2 };
    ballPosition.current.setValue(initialPosition.current);
    opacity.current.setValue(1);
  }, [layout, useNativeDriver]);

  const panGesture = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderEnd: () => {
      Animated.spring(ballPosition.current, {
        toValue: initialPosition.current,
        useNativeDriver,
      }).start();
    },
    onPanResponderMove: (_, gestureState) => {
      const toValue = getBoundedPosition(
        gestureState,
        initialPosition.current,
        size,
      );
      Animated.spring(ballPosition.current, {
        toValue,
        useNativeDriver,
      }).start();
    },
  });

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Drag"
    >
      <View
        onLayout={onLayout}
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
          style={[
            ballPosition.current.getLayout(),
            { opacity: opacity.current },
            styles.ball,
          ]}
          {...panGesture.panHandlers} // eslint-disable-line react/jsx-props-no-spreading
        />
      </View>
    </Screen>
  );
};
