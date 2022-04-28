import React, { memo } from 'react';
import { View } from 'react-native';
import { useColors } from '../../../../features';
import { getSmallestDimension, useRootSelector } from '../../../../redux';

interface CellProps {
  length: number;
  value: number;
}

export const Cell = memo(function Cell({ value, length }: CellProps) {
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
        flex: 1,
        width,
        height: width,
        borderWidth: 1,
        borderColor: colors.background.secondary,
        backgroundColor,
      }}
    />
  );
});
