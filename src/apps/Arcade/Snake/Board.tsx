import { View } from 'react-native';
import React from 'react';
import { Matrix } from './utils';
import { Cell } from './Cell';

interface BoardProps {
  matrix: Matrix;
}

// TODO: figure out why board is updating with memo
export const Board = ({ matrix }: BoardProps): JSX.Element => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {matrix.map((x, i) => (
        <View key={i} style={{ flexDirection: 'row' }}>
          {x.map((y, j) => (
            <Cell key={`cell-${i}${j}`} length={matrix.length} value={y} />
          ))}
        </View>
      ))}
    </View>
  );
};
