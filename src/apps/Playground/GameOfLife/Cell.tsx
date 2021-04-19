import React, {memo} from 'react';
import {TouchableOpacity} from '../../../components';
import {useColor} from '../../../hooks';

interface CellProps {
  x: number;
  y: number;
  selected: boolean;
  size: number;
  onItemPress(x: number, y: number): () => void;
}

export const Cell = memo(function Cell({
  x,
  y,
  selected,
  size,
  onItemPress,
}: CellProps) {
  const color = useColor();
  return (
    <TouchableOpacity
      key={`${x}-${y}`}
      onPress={onItemPress(x, y)}
      style={{
        height: size,
        width: size,
        backgroundColor: selected ? color.primary : color.background,
        borderWidth: 1,
        borderColor: color.light,
      }}
    />
  );
});
