import {useRef, MutableRefObject} from 'react';
import {
  PanResponder,
  PanResponderInstance,
  GestureResponderHandlers,
} from 'react-native';

export type Direction = 'left' | 'right' | 'up' | 'down';

export const useGesture = (): {
  panHandlers: GestureResponderHandlers;
  direction: MutableRefObject<Direction>;
} => {
  const direction = useRef<Direction>('up');
  const panResponder: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: (_, g) => {
      if (Math.abs(g.dx) >= Math.abs(g.dy)) {
        direction.current = g.dx >= 0 ? 'right' : 'left';
      } else {
        direction.current = g.dy >= 0 ? 'down' : 'up';
      }
    },
  });

  return {direction, panHandlers: panResponder.panHandlers};
};
