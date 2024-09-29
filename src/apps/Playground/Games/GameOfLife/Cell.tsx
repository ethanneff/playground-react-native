import React, { useCallback } from 'react';
import { Pressable } from '../../../../components';
import { useColors } from '../../../../features';
import {
  getSmallestDimension,
  useAppDispatch,
  useAppSelector,
} from '../../../../redux';
import { getCell, updateCell } from './redux';

type Properties = {
  readonly x: number;
  readonly y: number;
};

export const Cell = ({ x, y }: Properties) => {
  const colors = useColors();
  const dispatch = useAppDispatch();
  const smallest = useAppSelector(getSmallestDimension);
  const selected = useAppSelector(getCell(x, y));
  const count = useAppSelector((state) => state.games.life.count);
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
};
