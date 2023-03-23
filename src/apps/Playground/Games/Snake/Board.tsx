import React from 'react';
import { v4 } from 'uuid';
import { View } from '../../../../components';
import { Cell } from './Cell';
import { type Matrix } from './utils';

type BoardProps = {
  matrix: Matrix;
};

// TODO: figure out why board is updating with memo
export const Board = ({ matrix }: BoardProps): JSX.Element => {
  return (
    <View
      flex={1}
      justifyContent="center"
    >
      {matrix.map((x) => (
        <View
          flexDirection="row"
          key={v4()}
        >
          {x.map((y) => (
            <Cell
              key={v4()}
              length={matrix.length}
              value={y}
            />
          ))}
        </View>
      ))}
    </View>
  );
};
