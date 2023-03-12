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

type GetColumnsProps<T> = { data: T[]; numColumns: number };

const getColumns = <T,>({ data, numColumns }: GetColumnsProps<T>): T[][] => {
  const columns: T[][] = Array(numColumns)
    .fill(0)
    .map(() => []);
  data.forEach((item: T, i: number) => columns[i % numColumns].push(item));
  return columns;
};

export const Masonry = memo(function Masonry<T>({
  data,
  numColumns,
  renderItem,
}: Props<T>) {
  const columns = getColumns({ data, numColumns });

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
