import React, {memo, useMemo} from 'react';
import {View} from 'react-native';
import {useRootSelector} from '../../../redux';
import {Cell} from './Cell';
import {useLoop} from './useLoop';

export const GameBoard = memo(function GameBoard() {
  const count = useRootSelector(state => state.gameOfLife.count);
  const array = useMemo(() => Array(count).fill(0), [count]);
  useLoop();

  return (
    <View>
      {array.map((_, x) => (
        <View
          key={`${x}`}
          style={{flexDirection: 'row', justifyContent: 'center'}}>
          {array.map((__, y) => (
            <Cell key={`${x}-${y}`} x={x} y={y} />
          ))}
        </View>
      ))}
    </View>
  );
});
