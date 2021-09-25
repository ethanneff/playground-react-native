import React, { memo } from 'react';
import { View } from 'react-native';
import { v4 } from 'uuid';
import { padding } from '../../features/Config';

interface Item<T> {
  item: T;
  index: number;
}

interface Props<T> {
  data: T[];
  numColumns: number;
  renderItem({ item, index }: Item<T>): void;
}

export const Masonry = memo(function Masonry<T>({
  data,
  numColumns,
  renderItem,
}: Props<T>) {
  const columns: T[][] = [...Array(numColumns)].map(() => []);
  data.forEach((item: T, i: number) => columns[i % numColumns].push(item));

  return (
    <View style={{ flexDirection: 'row', padding: padding(2) }}>
      {columns.map((column) => (
        <View key={`column-${v4()}`} style={{ flex: 1, padding: padding(2) }}>
          {column.map((item: T, index: number) => renderItem({ item, index }))}
        </View>
      ))}
    </View>
  );
});
