import React, {memo} from 'react';
import {View} from 'react-native';
import {Theme} from '../../utils';

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
    <View style={{flexDirection: 'row', padding: Theme.padding.p02}}>
      {columns.map((column, j) => (
        <View key={`column-${j}`} style={{flex: 1, padding: Theme.padding.p02}}>
          {column.map((item: T, index: number) => renderItem({item, index}))}
        </View>
      ))}
    </View>
  );
});
