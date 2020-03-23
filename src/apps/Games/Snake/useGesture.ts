import { useState } from 'react';
import {
  PanResponder,
  PanResponderInstance,
  GestureResponderHandlers,
} from 'react-native';

export type Direction = 'left' | 'right' | 'up' | 'down';

export const useGesture = (): {
  panHandlers: GestureResponderHandlers;
  direction: Direction;
} => {
  const [direction, setDirection] = useState<Direction>('up');
  const panResponder: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: (_, g) => {
      if (Math.abs(g.dx) >= Math.abs(g.dy)) {
        setDirection(g.dx >= 0 ? 'right' : 'left');
      } else {
        setDirection(g.dy >= 0 ? 'down' : 'up');
      }
    },
  });

  return { direction, panHandlers: panResponder.panHandlers };
};
