import React, { memo, useCallback, useEffect, useState } from 'react';
import { Button, Screen, Text, View } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { Board } from './Board';
import { EndGame } from './EndGame';
import { useClock } from './useClock';
import { useGesture } from './useGesture';
import { getBoard, updateBoard, type BoardContext } from './utils';

type State = 'error' | 'off' | 'on' | 'win';

type Game = {
  board: BoardContext;
  points: number;
  state: State;
};

// TODO: need to save the entire board to redux to load on app open

export const Snake = memo(function Snake() {
  const { goBack } = useNavigation();
  const size = 20;
  const frequency = 200;
  const [game, setGame] = useState<Game>({
    board: getBoard(size),
    points: 0,
    state: 'off',
  });
  const { direction, panHandlers } = useGesture({ noReverse: true });

  const update = useCallback(() => {
    const board = updateBoard(game.board, direction.current);
    if (board.state === 'ate food')
      setGame((prev) => ({ ...prev, board, points: prev.points + 1 }));
    else if (board.state === 'ok') setGame((prev) => ({ ...prev, board }));
    else setGame((prev) => ({ ...prev, board, state: 'error' }));
  }, [direction, game.board]);

  const { start, stop } = useClock({
    frequency,
    onUpdate: update,
  });

  const onStart = useCallback(() => {
    const board = getBoard(size);
    setGame((prev) => ({ ...prev, board, points: 0, state: 'on' }));
  }, []);

  const onStop = useCallback(() => {
    setGame((prev) => ({ ...prev, state: 'off' }));
  }, []);

  useEffect(() => {
    if (game.state === 'on') {
      start();
    } else {
      direction.current = 'up';
      stop();
    }
  }, [game.state, start, stop, direction]);

  return (
    <>
      <Screen
        onLeftPress={goBack}
        title="Snake"
      >
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button
            onPress={onStart}
            title="start"
          />
          <Button
            onPress={onStop}
            title="stop"
          />
          <Text title={`points: ${game.points}`} />
        </View>
        <View
          backgroundColor="positive"
          flex={1}
          {...panHandlers} // eslint-disable-line react/jsx-props-no-spreading
        >
          <Board matrix={game.board.matrix} />
        </View>
      </Screen>
      {game.state === 'error' && <EndGame onPress={onStart} />}
    </>
  );
});
