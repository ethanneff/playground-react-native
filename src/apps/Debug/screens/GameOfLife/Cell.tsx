import React, { memo } from 'react';
import { useColor } from '../../../../hooks';
import { TouchableOpacity } from 'react-native';

interface CellProps {
  x: number;
  y: number;
  row: number;
  size: number;
  onItemPress(x: number, y: number): () => void;
}

export const Cell = memo(function Cell(props: CellProps) {
  const color = useColor();
  return (
    <TouchableOpacity
      onPress={props.onItemPress(props.x, props.y)}
      key={`${props.x}-${props.y}`}
      style={{
        height: props.size,
        width: props.size,
        backgroundColor: props.row ? color.primary : color.surface,
        borderWidth: 1,
        borderColor: color.light,
      }}
    />
  );
});
