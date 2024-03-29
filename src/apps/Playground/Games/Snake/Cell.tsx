import React from 'react';
import { View } from '../../../../components';
import { useColors } from '../../../../features';
import { getSmallestDimension, useAppSelector } from '../../../../redux';

type CellProperties = {
  readonly length: number;
  readonly value: number;
};

export const Cell = ({ length, value }: CellProperties) => {
  const colors = useColors();
  const width = useAppSelector(getSmallestDimension) / length;
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
        borderWidth: 0.5,
        flex: 1,
        height: width,
        width,
      }}
    />
  );
};
