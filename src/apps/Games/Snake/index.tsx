import React, { memo, useState, useCallback } from 'react';
import { View } from 'react-native';
import { Screen, Button } from '../../../components';
import { useColor, useNav } from '../../../hooks';
import { BoardObject, generateBoard } from './utils';
import { Board } from './Board';
import { useGameLoop } from './useGameLoop';
import { useGesture } from './useGesture';
import { EndGame } from './EndGame';

type State = 'on' | 'off';

type Game = {
  board: BoardObject;
  state: State;
};

// TODO: need to save the entire board to redux to load on app open

export default memo(function Snake() {
  const color = useColor();
  const nav = useNav();
  const size = 20;
  const [game, setGame] = useState<Game>({
    board: generateBoard(size),
    state: 'off',
  });
  const gesture = useGesture();

  const { start, stop } = useGameLoop(frame => {
    if (frame.count >= 200) {
      setGame(prev => ({ ...prev, state: 'off' }));
      stop();
    }
  });

  const reset = useCallback(() => {
    setGame({ board: generateBoard(size), state: 'on' });
    start();
  }, [start]);

  return (
    <>
      <Screen onLeftPress={nav.to('portfolioLanding')} title="Snake">
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button title="start" onPress={start} />
          <Button title="stop" onPress={stop} />
        </View>
        <View
          style={{ flex: 1, backgroundColor: color.success }}
          {...gesture.panHandlers}
        >
          <Board board={game.board} />
        </View>
      </Screen>
      {game.state === 'off' && <EndGame onPress={reset} />}
    </>
  );
});
