import React, { Ref } from 'react';
import { FlatListProps } from 'react-native';
import { GestureFlatList } from '../../conversions';

export type FlatListRef = GestureFlatList | null;
type Props<ItemT> = FlatListProps<ItemT> & {
  onRef?: Ref<GestureFlatList<ItemT>>;
};

export const FlatList = <ItemT,>({ onRef, ...rest }: Props<ItemT>) => {
  return (
    <GestureFlatList
      keyboardShouldPersistTaps="handled"
      removeClippedSubviews
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={onRef}
    />
  );
};
