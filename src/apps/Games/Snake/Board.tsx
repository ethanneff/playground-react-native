import {View} from 'react-native';
import {Matrix} from './utils';
import React, {memo} from 'react';
import {Cell} from './Cell';

interface BoardProps {
  matrix: Matrix;
}

export const Board = memo(function Board({matrix}: BoardProps) {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {matrix.map((row, i) => (
        <View key={i} style={{flexDirection: 'row'}}>
          {row.map((col, j) => (
            <Cell key={`cell-${i}${j}`} value={col} length={matrix.length} />
          ))}
        </View>
      ))}
    </View>
  );
});
