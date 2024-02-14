import React, { useCallback, useEffect, useState } from 'react';
import { Animated } from 'react-native';
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

export const Snake = () => {
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
      setGame((previous) => ({
        ...previous,
        board,
        points: previous.points + 1,
      }));
    else if (board.state === 'ok')
      setGame((previous) => ({ ...previous, board }));
    else setGame((previous) => ({ ...previous, board, state: 'error' }));
  }, [direction, game.board]);

  const { start, stop } = useClock({
    frequency,
    onUpdate: update,
  });

  const onStart = useCallback(() => {
    const board = getBoard(size);
    setGame((previous) => ({ ...previous, board, points: 0, state: 'on' }));
  }, []);

  const onStop = useCallback(() => {
    setGame((previous) => ({ ...previous, state: 'off' }));
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
        <View flex={1}>
          <Animated.View
            style={{ flex: 1 }}
            {...panHandlers} // eslint-disable-line react/jsx-props-no-spreading
          >
            <Board matrix={game.board.matrix} />
          </Animated.View>
        </View>
      </Screen>
      {game.state === 'error' && <EndGame onPress={onStart} />}
    </>
  );
};
