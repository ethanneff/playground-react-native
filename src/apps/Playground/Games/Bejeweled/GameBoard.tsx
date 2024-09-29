import React from 'react';
import { v4 } from 'uuid';
import { View } from '../../../../components';
import { useAppSelector } from '../../../../redux';
import { GameCell } from './GameCell';

export const GameBoard = () => {
  const length = useAppSelector((state) => state.games.bejeweled.board.length);

  const temporaryBoard = Array.from({ length }, () =>
    Array.from({ length }, () => 0),
  );

  return temporaryBoard.map((col, x) => (
    <View
      flexDirection="row"
      key={v4()}
    >
      {col.map((_, y) => (
        <GameCell
          key={v4()}
          x={x}
          y={y}
        />
      ))}
    </View>
  ));
};
