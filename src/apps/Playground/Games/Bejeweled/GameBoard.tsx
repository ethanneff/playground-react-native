import React from 'react';
import { v4 } from 'uuid';
import { View } from '../../../../components';
import { useAppSelector } from '../../../../redux';
import { GameCell } from './GameCell';

export const GameBoard = () => {
  const length = useAppSelector((state) => state.games.bejeweled.board.length);

  return Array.from({ length }, () => Array.from({ length }, () => 0)).map(
    (col, x) => (
      <View
        flexDirection="row"
        key={v4()}
      >
        {col.map((_, y) => (
          <View key={v4()}>
            <GameCell
              x={x}
              y={y}
            />
          </View>
        ))}
      </View>
    ),
  );
};
