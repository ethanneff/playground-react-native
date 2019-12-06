import React, { memo } from "react";
import { useColor } from "../../../hooks";
import { useRootSelector } from "../../../utils";
import { View } from "react-native";
import { getSmallestDimension } from "../../../models";

interface CellProps {
  value: number;
  length: number;
  key: string;
}

export const Cell = memo(function Cell({ value, key, length }: CellProps) {
  const color = useColor();
  const width = useRootSelector(getSmallestDimension) / length;
  const backgroundColor =
    value === 0 ? color.surface : value === 1 ? color.success : color.danger;
  return (
    <View
      key={key}
      style={{
        flex: 1,
        width,
        height: width,
        backgroundColor
      }}
    />
  );
});
