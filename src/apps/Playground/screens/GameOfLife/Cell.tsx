import React, {memo} from 'react';
import {useColor} from '../../../../hooks';
import {TouchableOpacity} from '../../../../components';

interface CellProps {
  x: number;
  y: number;
  row: number;
  size: number;
  onItemPress(x: number, y: number): () => void;
}

export const Cell = memo(function Cell({
  x,
  y,
  row,
  size,
  onItemPress,
}: CellProps) {
  const color = useColor();
  return (
    <TouchableOpacity
      onPress={onItemPress(x, y)}
      key={`${x}-${y}`}
      style={{
        height: size,
        width: size,
        backgroundColor: row ? color.primary : color.surface,
        borderWidth: 1,
        borderColor: color.light,
      }}
    />
  );
});
