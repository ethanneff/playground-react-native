import React, {memo, useState, useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {Screen, Button} from '../../../components';
import {useColor, useNav} from '../../../hooks';
import {BoardContext, getBoard, updateBoard} from './utils';
import {Board} from './Board';
import {useGesture} from './useGesture';
import {EndGame} from './EndGame';
import {useClock} from './useClock';

type State = 'on' | 'off' | 'error' | 'win';

type Game = {
  board: BoardContext;
  points: number;
  state: State;
};

// TODO: need to save the entire board to redux to load on app open

export default memo(function Snake() {
  const color = useColor();
  const nav = useNav();
  const size = 20;
  const [game, setGame] = useState<Game>({
    board: getBoard(size),
    points: 0,
    state: 'off',
  });
  const {direction, panHandlers} = useGesture({noReverse: true});

  const update = useCallback(() => {
    const board = updateBoard(game.board, direction.current);

    if (board.state !== 'ok') {
      setGame((prev) => ({...prev, board, state: 'error'}));
    } else {
      setGame((prev) => ({...prev, board}));
    }
  }, [direction, game.board]);

  const {start, stop} = useClock({
    frequency: 100,
    onUpdate: update,
  });

  const onStart = useCallback(() => {
    const board = getBoard(size);
    setGame((prev) => ({...prev, board, state: 'on'}));
  }, []);

  const onStop = useCallback(() => {
    setGame((prev) => ({...prev, state: 'off'}));
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
      <Screen onLeftPress={nav.to('portfolioLanding')} title="Snake">
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Button title="start" onPress={onStart} />
          <Button title="stop" onPress={onStop} />
        </View>
        <View
          style={{flex: 1, backgroundColor: color.success}}
          {...panHandlers}>
          <Board matrix={game.board.matrix} />
        </View>
      </Screen>
      {game.state === 'error' && <EndGame onPress={onStart} />}
    </>
  );
});
