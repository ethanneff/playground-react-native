import React, {memo, useState, useCallback} from 'react';
import {View} from 'react-native';
import {Screen, Button} from '../../../components';
import {useColor, useNav} from '../../../hooks';
import {BoardContext, getBoard, updateBoard} from './utils';
import {Board} from './Board';
import {useGesture} from './useGesture';
import {EndGame} from './EndGame';
import {useClock} from './useClock';

type State = 'on' | 'off';

type Game = {
  board: BoardContext;
  points: number;
  state: State;
};

// TODO: need to save the entire board to redux to load on app open
// TODO: figure out why board is updating, but not rendering

export default memo(function Snake() {
  const color = useColor();
  const nav = useNav();
  const size = 20;
  const [game, setGame] = useState<Game>({
    board: getBoard(size),
    points: 0,
    state: 'off',
  });

  const {direction, panHandlers} = useGesture();
  const {start, stop} = useClock({
    frequency: 400,
    onUpdate: useCallback(() => {
      const board = updateBoard(game.board, direction.current);
      setGame((state) => ({...state, board}));
    }, [game.board, direction]),
  });

  const onStart = useCallback(() => {
    const board = getBoard(size);
    setGame((state) => ({...state, board, state: 'on'}));
    start();
  }, [start]);

  const onStop = useCallback(() => {
    setGame((state) => ({...state, state: 'off'}));
    stop();
  }, [stop]);

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
      {game.state === 'off' && <EndGame onPress={onStart} />}
    </>
  );
});
