import React, { useCallback, useState } from 'react';
import { v4 } from 'uuid';
import {
  Button,
  Pressable,
  Screen,
  Spacing,
  Text,
  View,
} from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { spacing, useColors, useDropShadow } from '../../../../features';
import {
  getLandscapeOrientation,
  getSmallestDimension,
  useAppSelector,
} from '../../../../redux';
import { type State } from './types';
import {
  getInitialState,
  getNextValue,
  getUpdatedBoard,
  getValue,
  getWinner,
} from './utils';

export const TicTacToe = () => {
  const boardSize = 3;
  const colors = useColors();
  const { goBack } = useNavigation();
  const dropShadow = useDropShadow();
  const [game, setGame] = useState<State>(getInitialState(boardSize));
  const smallest = useAppSelector(getSmallestDimension);
  const landscape = useAppSelector(getLandscapeOrientation);
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
        <Spacing padding={spacing(2)} />
        <View>
          {game.board.map((row, i) => (
            <View
              flexDirection="row"
              key={v4()}
            >
              {row.map((_, j) => (
                <Pressable
                  containerStyle={{
                    alignItems: 'center',
                    backgroundColor: colors.background.primaryA,
                    height: size,
                    justifyContent: 'center',
                    margin: spacing(1),
                    width: size,
                    ...dropShadow(1),
                  }}
                  disabled={
                    game.board[i][j] !== 0 || game.state === 'game-over'
                  }
                  key={v4()}
                  onPress={onCellPress(i, j)}
                >
                  <Text
                    title={getValue(game.board[i][j])}
                    type="h4"
                  />
                </Pressable>
              ))}
            </View>
          ))}
        </View>
        <Spacing padding={spacing(2)} />

        <Button
          center
          emphasis="medium"
          onPress={onButtonPress}
          title={buttonTitle}
        />
      </View>
    </Screen>
  );
};
