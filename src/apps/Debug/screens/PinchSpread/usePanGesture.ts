import {
  GestureResponderEvent,
  PanResponderGestureState,
  PanResponder,
  PanResponderInstance
} from "react-native";
import { useState, useEffect } from "react";

type Props = {
  onStartShouldSetPanResponder?(
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ): boolean;
  onStartShouldSetPanResponderCapture?(
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ): boolean;
  onMoveShouldSetPanResponder?(
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ): boolean;
  onMoveShouldSetPanResponderCapture?(
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ): boolean;
  onPanResponderGrant?(
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ): void;
  onPanResponderMove?(
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ): void;
  onPanResponderTerminationRequest?(
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ): boolean;
  onPanResponderRelease?(
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ): void;
  onPanResponderTerminate?(
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ): void;
  onShouldBlockNativeResponder?(
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ): boolean;
};

export const usePanGesture = ({
  onStartShouldSetPanResponder,
  onStartShouldSetPanResponderCapture,
  onMoveShouldSetPanResponder,
  onMoveShouldSetPanResponderCapture,
  onPanResponderGrant,
  onPanResponderMove,
  onPanResponderTerminationRequest,
  onPanResponderRelease,
  onPanResponderTerminate,
  onShouldBlockNativeResponder
}: Props): PanResponderInstance => {
  const [panGesture, setPanGesture] = useState();
  useEffect(() => {
    const gesture = PanResponder.create({
      onStartShouldSetPanResponder,
      onStartShouldSetPanResponderCapture,
      onMoveShouldSetPanResponder,
      onMoveShouldSetPanResponderCapture,
      onPanResponderGrant,
      onPanResponderMove,
      onPanResponderTerminationRequest,
      onPanResponderRelease,
      onPanResponderTerminate,
      onShouldBlockNativeResponder
    });
    setPanGesture(gesture);
  }, [
    // TODO: memory leak because of all these imports
    onMoveShouldSetPanResponder,
    onMoveShouldSetPanResponderCapture,
    onPanResponderGrant,
    onPanResponderMove,
    onPanResponderRelease,
    onPanResponderTerminate,
    onPanResponderTerminationRequest,
    onShouldBlockNativeResponder,
    onStartShouldSetPanResponder,
    onStartShouldSetPanResponderCapture
  ]);

  return panGesture;
};
