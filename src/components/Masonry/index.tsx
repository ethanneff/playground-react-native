import React, {memo} from 'react';
import {View} from 'react-native';
import {config} from '../../utils';

interface Item<T> {
  item: T;
  index: number;
}

interface Props<T> {
  data: T[];
  numColumns: number;
  renderItem({item, index}: Item<T>): void;
}

export const Masonry = memo(function Masonry<T>({
  data,
  numColumns,
  renderItem,
}: Props<T>) {
  const columns: T[][] = [...Array(numColumns)].map(() => []);
  data.forEach((item: T, i: number) => columns[i % numColumns].push(item));

  return (
    <View style={{flexDirection: 'row', padding: config.padding(2)}}>
      {columns.map((column, j) => (
        <View key={`column-${j}`} style={{flex: 1, padding: config.padding(2)}}>
          {column.map((item: T, index: number) => renderItem({item, index}))}
        </View>
      ))}
    </View>
  );
});
