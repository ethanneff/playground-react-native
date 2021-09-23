import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button, Screen, Text } from '../../../components';
import { TouchableOpacity } from '../../../conversions';
import { useColor } from '../../../features';
import {
  getLandscapeOrientation,
  getSmallestDimension,
  useRootSelector,
} from '../../../redux';
import { State } from './types';
import {
  getInitialState,
  getNextValue,
  getUpdatedBoard,
  getValue,
  getWinner,
} from './utils';

export const TicTacToe = memo(function TicTacToe() {
  const boardSize = 3;
  const color = useColor();
  const { goBack } = useNavigation();

  const [game, setGame] = useState<State>(getInitialState(boardSize));
  const smallest = useRootSelector(getSmallestDimension);
  const landscape = useRootSelector(getLandscapeOrientation);
  const size = smallest / (boardSize + 1);
  const buttonTitle = game.state === 'game-over' ? 'new game' : 'reset';
  const turnTitle = game.winner
    ? `winner ${game.winner}`
    : `${game.turn}'s move`;

  const onButtonPress = useCallback(() => {
    setGame(getInitialState(boardSize));
  }, []);

  const onCellPress = useCallback(
    (i: number, j: number) => () => {
      setGame(p => {
        const nextValue = getNextValue(p.turn);
        const updatedBoard = getUpdatedBoard(p.board, i, j, nextValue);
        const didWin = getWinner(p.board, i, j, boardSize);
        const winner = didWin === 1 ? 'white' : didWin === -1 ? 'black' : null;
        return {
          ...p,
          board: updatedBoard,
          turn: p.turn === 'white' ? 'black' : 'white',
          state: didWin !== 0 ? 'game-over' : 'playing',
          winner,
        };
      });
    },
    [],
  );

  return (
    <Screen onLeftPress={goBack} title="Tic Tac Toe">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color.background.secondary,
          flexDirection: landscape ? 'row' : 'column',
        }}
      >
        <View>
          {game.board.map((row, i) => (
            <View key={`row-${i}`} style={{ flexDirection: 'row' }}>
              {row.map((_, j) => (
                <TouchableOpacity
                  disabled={
                    game.board[i][j] !== 0 || game.state === 'game-over'
                  }
                  key={`cell-${i}${j}`}
                  onPress={onCellPress(i, j)}
                  style={{
                    width: size,
                    height: size,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: color.background.primaryA,
                    borderWidth: 2,
                    borderColor: color.background.secondary,
                  }}
                >
                  <Text title={getValue(game.board[i][j])} type="h4" />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text title={turnTitle} />
          <Button onPress={onButtonPress} title={buttonTitle} />
        </View>
      </View>
    </Screen>
  );
});
