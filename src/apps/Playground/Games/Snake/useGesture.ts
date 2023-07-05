import { useRef, type MutableRefObject } from 'react';
import {
  PanResponder,
  type GestureResponderEvent,
  type GestureResponderHandlers,
  type PanResponderGestureState,
  type PanResponderInstance,
} from 'react-native';

export type Direction = 'down' | 'left' | 'right' | 'up';

type Props = {
  noReverse?: boolean;
};

const inverse: Record<string, Direction> = {
  down: 'up',
  left: 'right',
  right: 'left',
  up: 'down',
};

export const useGesture = ({
  noReverse,
}: Props): {
  direction: MutableRefObject<Direction>;
  panHandlers: GestureResponderHandlers;
} => {
  const direction = useRef<Direction>('up');

  const panResponder: PanResponderInstance = useRef(
    PanResponder.create({
      onPanResponderRelease: (
        _: GestureResponderEvent,
        g: PanResponderGestureState,
      ) => {
        let direct: Direction = 'up';
        if (Math.abs(g.dx) >= Math.abs(g.dy))
          direct = g.dx >= 0 ? 'right' : 'left';
        else direct = g.dy >= 0 ? 'down' : 'up';
        const reverse = noReverse && inverse[direct] === direction.current;
        direction.current = reverse ? direction.current : direct;
      },
      onStartShouldSetPanResponder: () => true,
    }),
  ).current;

  return { direction, panHandlers: panResponder.panHandlers };
};
