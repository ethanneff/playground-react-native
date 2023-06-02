import React, { type RefObject } from 'react';
// eslint-disable-next-line no-restricted-imports
import { type FlatListProps, type ListRenderItem } from 'react-native';
import { GestureFlatList } from '../../conversions';

export type FlatListRef<T> = GestureFlatList<T> | null;
export type FlatListRenderItem<T> = ListRenderItem<T>;

type ListProps<ItemT> = FlatListProps<ItemT> & {
  onRef?: RefObject<GestureFlatList<ItemT>>;
};

export const FlatList = <ItemT,>({ onRef, ...rest }: ListProps<ItemT>) => {
  return (
    <GestureFlatList
      keyboardShouldPersistTaps="handled"
      ref={onRef}
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
    />
  );
};
