import React, {memo, useState, useCallback, useRef, useEffect} from 'react';
import {View} from 'react-native';
import {Screen, Button} from '../../../components';
import {useColor, useNav} from '../../../hooks';
import {BoardObject, generateBoard} from './utils';
import {Board} from './Board';
import {useGesture} from './useGesture';
import {EndGame} from './EndGame';
import {useClock} from './useClock';

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
  const {direction, panHandlers} = useGesture();

  const {start, stop} = useClock({
    frequency: 60,
    onUpdate: useCallback(() => {
      console.log('update', Date.now(), direction.current);
    }, [direction]),
  });

  const onStart = () => {
    setGame({board: generateBoard(size), state: 'on'});
    start();
  };

  const onStop = () => {
    setGame({board: generateBoard(size), state: 'off'});
    stop();
  };

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
          <Board board={game.board} />
        </View>
      </Screen>
      {game.state === 'off' && <EndGame onPress={onStart} />}
    </>
  );
});
