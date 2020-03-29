import {View} from 'react-native';
import {BoardObject} from './utils';
import React, {memo} from 'react';
import {Cell} from './Cell';

interface BoardProps {
  board: BoardObject;
}

export const Board = memo(function Board({board}: BoardProps) {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {board.map((x, i) => (
        <View key={i} style={{flexDirection: 'row'}}>
          {x.map((y, j) => (
            <Cell key={`cell-${i}${j}`} value={y} length={board.length} />
          ))}
        </View>
      ))}
    </View>
  );
});
