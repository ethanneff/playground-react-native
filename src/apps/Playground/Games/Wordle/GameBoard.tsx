import React from 'react';
import { v4 } from 'uuid';
import { View } from '../../../../components';
import { spacing } from '../../../../features';
import { useAppSelector } from '../../../../redux';
import { GameCell } from './GameCell';

export const GameBoard = () => {
  const cells = useAppSelector((state) => state.games.wordle.board.cells);

  return (
    <View
      alignItems="center"
      gap={spacing(2)}
    >
      {cells.map((row, x) => (
        <View
          flexDirection="row"
          gap={spacing(2)}
          key={v4()}
        >
          {row.map((_, y) => (
            <GameCell
              key={v4()}
              x={x}
              y={y}
            />
          ))}
        </View>
      ))}
    </View>
  );
};
