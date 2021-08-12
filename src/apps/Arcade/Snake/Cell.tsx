import React, {memo} from 'react';
import {View} from 'react-native';
import {useColor} from '../../../features';
import {getSmallestDimension, useRootSelector} from '../../../redux';

interface CellProps {
  value: number;
  length: number;
}

export const Cell = memo(function Cell({value, length}: CellProps) {
  const color = useColor();
  const width = useRootSelector(getSmallestDimension) / length;
  const backgroundColor =
    value === 0
      ? color.background.secondary
      : value === 1
      ? color.background.positive
      : color.background.negative;
  return (
    <View
      style={{
        flex: 1,
        width,
        height: width,
        borderWidth: 1,
        borderColor: color.background.secondary,
        backgroundColor,
      }}
    />
  );
});
