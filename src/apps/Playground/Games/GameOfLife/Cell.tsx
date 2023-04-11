import React, { memo, useCallback } from 'react';
import { Pressable } from '../../../../components';
import { useColors } from '../../../../features';
import {
  getSmallestDimension,
  useAppSelector,
  useAppDispatch,
} from '../../../../redux';
import { getCell, updateCell } from './redux';

type Props = {
  x: number;
  y: number;
};

export const Cell = memo(function Cell({ x, y }: Props) {
  const colors = useColors();
  const dispatch = useAppDispatch();
  const smallest = useAppSelector(getSmallestDimension);
  const selected = useAppSelector(getCell(x, y));
  const count = useAppSelector((state) => state.gameOfLife.count);
  const size = smallest / count;

  const onItemPress = useCallback(
    (dx: number, dy: number) => () => {
      dispatch(updateCell(dx, dy));
    },
    [dispatch],
  );

  return (
    <Pressable
      containerStyle={{
        backgroundColor: selected
          ? colors.background.accent
          : colors.background.primaryA,
        borderColor: colors.background.secondary,
        borderWidth: 1,
        height: size,
        width: size,
      }}
      onPress={onItemPress(x, y)}
    />
  );
});
