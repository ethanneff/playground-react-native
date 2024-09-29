import React, { useCallback } from 'react';
import { Pressable, Text, View } from '../../../../components';
import { spacing, useColors } from '../../../../features';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import { selectCell } from './redux';
import { type Vector } from './types';

export const GameCell = ({ x, y }: Vector) => {
  const colors = useColors();
  const cell = useAppSelector((state) => state.games.bejeweled.board[x][y]);

  const dispatch = useAppDispatch();

  const handlePress = useCallback(() => {
    dispatch(selectCell({ x, y }));
  }, [dispatch, x, y]);

  return (
    <View>
      <Pressable onPressIn={handlePress}>
        <View
          borderColor={cell.selected ? colors.border.negative : 'transparent'}
          borderRadius={spacing(2)}
          borderWidth={2}
          padding={2}
        >
          <Text
            center
            title={cell.gem}
            type="h6"
          />
        </View>
      </Pressable>
    </View>
  );
};
