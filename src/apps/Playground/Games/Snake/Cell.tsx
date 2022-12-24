import React, { memo } from 'react';
import { View } from '../../../../components';
import { useColors } from '../../../../features';
import { getSmallestDimension, useRootSelector } from '../../../../redux';

type CellProps = {
  length: number;
  value: number;
};

export const Cell = memo(function Cell({ length, value }: CellProps) {
  const colors = useColors();
  const width = useRootSelector(getSmallestDimension) / length;
  const backgroundColor =
    value === 0
      ? colors.background.secondary
      : value === 1
      ? colors.background.positive
      : colors.background.negative;
  return (
    <View
      style={{
        backgroundColor,
        borderColor: colors.background.secondary,
        borderWidth: 1,
        flex: 1,
        height: width,
        width,
      }}
    />
  );
});
