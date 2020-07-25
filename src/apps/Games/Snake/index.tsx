import React, {memo, useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Screen, Text} from '../../../components';
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
  const frequency = 200;
  const [game, setGame] = useState<Game>({
    board: getBoard(size),
    points: 0,
    state: 'off',
  });
  const {direction, panHandlers} = useGesture({noReverse: true});

  const update = useCallback(() => {
    const board = updateBoard(game.board, direction.current);
    if (board.state === 'ate food') {
      setGame((prev) => ({...prev, board, points: prev.points + 1}));
    } else if (board.state === 'ok') {
      setGame((prev) => ({...prev, board}));
    } else {
      setGame((prev) => ({...prev, board, state: 'error'}));
    }
  }, [direction, game.board]);

  const {start, stop} = useClock({
    frequency,
    onUpdate: update,
  });

  const onStart = useCallback(() => {
    const board = getBoard(size);
    setGame((prev) => ({...prev, board, points: 0, state: 'on'}));
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
  const navBack = useCallback(nav('portfolioLanding'), [nav]);

  return (
    <>
      <Screen onLeftPress={navBack} title="Snake">
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Button onPress={onStart} title="start" />
          <Button onPress={onStop} title="stop" />
          <Text title={`points: ${game.points}`} />
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
