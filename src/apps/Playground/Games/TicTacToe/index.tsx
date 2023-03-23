import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useState } from 'react';
import { v4 } from 'uuid';
import {
  Button,
  Screen,
  Spacing,
  Text,
  TouchableOpacity,
  View,
} from '../../../../components';
import { spacing, useColors, useDropShadow } from '../../../../features';
import {
  getLandscapeOrientation,
  getSmallestDimension,
  useRootSelector,
} from '../../../../redux';
import { type State } from './types';
import {
  getInitialState,
  getNextValue,
  getUpdatedBoard,
  getValue,
  getWinner,
} from './utils';

export const TicTacToe = memo(function TicTacToe() {
  const boardSize = 3;
  const colors = useColors();
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
      setGame((p) => {
        const v = getNextValue(p.turn);
        const updatedBoard = getUpdatedBoard({ board: p.board, i, j, v });
        const didWin = getWinner({ board: p.board, boardSize, i, j });
        const winner = didWin === 1 ? 'white' : didWin === -1 ? 'black' : null;
        return {
          ...p,
          board: updatedBoard,
          state: didWin === 0 ? 'playing' : 'game-over',
          turn: p.turn === 'white' ? 'black' : 'white',
          winner,
        };
      });
    },
    [],
  );

  const dropShadow = useDropShadow();

  return (
    <Screen
      onLeftPress={goBack}
      title="Tic Tac Toe"
    >
      <View
        alignItems="center"
        backgroundColor="secondary"
        flex={1}
        flexDirection={landscape ? 'row' : 'column'}
        justifyContent="center"
      >
        <Text
          emphasis="medium"
          title={turnTitle}
          type="h5"
        />
        <Spacing padding={2} />
        <View>
          {game.board.map((row, i) => (
            <View
              flexDirection="row"
              key={v4()}
            >
              {row.map((_, j) => (
                <TouchableOpacity
                  disabled={
                    game.board[i][j] !== 0 || game.state === 'game-over'
                  }
                  key={v4()}
                  onPress={onCellPress(i, j)}
                  style={{
                    alignItems: 'center',
                    backgroundColor: colors.background.primaryA,
                    height: size,
                    justifyContent: 'center',
                    margin: spacing(1),
                    width: size,
                    ...dropShadow(1),
                  }}
                >
                  <Text
                    title={getValue(game.board[i][j])}
                    type="h4"
                  />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
        <Spacing padding={2} />

        <Button
          center
          emphasis="medium"
          onPress={onButtonPress}
          title={buttonTitle}
        />
      </View>
    </Screen>
  );
});
