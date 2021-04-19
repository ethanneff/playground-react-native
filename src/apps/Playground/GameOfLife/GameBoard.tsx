import React, {memo} from 'react';
import {View} from 'react-native';
import {Cell} from './Cell';
import {Board} from './utils';

type Props = {
  board: Board;
  onItemPress: (x: number, y: number) => () => void;
  size: number;
};

export const GameBoard = memo(function GameBoard({
  board,
  onItemPress,
  size,
}: Props) {
  return (
    <View>
      {board.map((rows, x) => (
        <View
          key={`${x}`}
          style={{flexDirection: 'row', justifyContent: 'center'}}>
          {rows.map((row, y) => (
            <Cell
              key={`${x}-${y}`}
              onItemPress={onItemPress}
              selected={!!row}
              size={size}
              x={x}
              y={y}
            />
          ))}
        </View>
      ))}
    </View>
  );
});
