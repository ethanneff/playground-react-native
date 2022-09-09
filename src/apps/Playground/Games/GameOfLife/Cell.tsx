import React, { memo, useCallback } from 'react';
import { TouchableOpacity } from '../../../../components';
import { useColors } from '../../../../features';
import {
  getSmallestDimension,
  useRootDispatch,
  useRootSelector,
} from '../../../../redux';
import { getCell, updateCell } from './redux';

type Props = {
  x: number;
  y: number;
};

export const Cell = memo(function Cell({ x, y }: Props) {
  const colors = useColors();
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
        backgroundColor: selected
          ? colors.background.accent
          : colors.background.primaryA,
        borderColor: colors.background.secondary,
        borderWidth: 1,
        height: size,
        width: size,
      }}
    />
  );
});
