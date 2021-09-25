import React, { memo, useCallback } from 'react';
import { TouchableOpacity } from '../../../components';
import { useColor } from '../../../features';
import {
  getSmallestDimension,
  useRootDispatch,
  useRootSelector,
} from '../../../redux';
import { getCell, updateCell } from './redux';

type Props = {
  x: number;
  y: number;
};

export const Cell = memo(function Cell({ x, y }: Props) {
  const color = useColor();
  const dispatch = useRootDispatch();
  const smallest = useRootSelector(getSmallestDimension);
  const selected = useRootSelector(getCell(x, y));
  const count = useRootSelector((state) => state.gameOfLife.count);
  const size = smallest / count;

  const onItemPress = useCallback(
    (dx: number, dy: number) => () => {
      dispatch(updateCell(dx, dy));
    },
    [dispatch],
  );

  return (
    <TouchableOpacity
      onPress={onItemPress(x, y)}
      style={{
        height: size,
        width: size,
        backgroundColor: selected
          ? color.background.accent
          : color.background.primaryA,
        borderWidth: 1,
        borderColor: color.background.secondary,
      }}
    />
  );
});
