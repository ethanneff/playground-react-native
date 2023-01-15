import React, { memo, type ReactElement } from 'react';
import { v4 } from 'uuid';
import { View } from '../../components';
import { spacing } from '../../features';

type Item<T> = {
  index: number;
  item: T;
};

type Props<T> = {
  data: T[];
  numColumns: number;
  renderItem: ({ index, item }: Item<T>) => ReactElement | null;
};

export const Masonry = memo(function Masonry<T>({
  data,
  numColumns,
  renderItem,
}: Props<T>) {
  const columns: T[][] = [...Array(numColumns)].map(() => []);
  data.forEach((item: T, i: number) => columns[i % numColumns].push(item));

  return (
    <View style={{ flexDirection: 'row', padding: spacing(2) }}>
      {columns.map((column) => (
        <View
          key={`column-${v4()}`}
          style={{ flex: 1, padding: spacing(2) }}
        >
          {column.map((item: T, index: number) => renderItem({ index, item }))}
        </View>
      ))}
    </View>
  );
});
