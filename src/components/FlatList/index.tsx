import React, { type Ref } from 'react';
import { type FlatListProps } from 'react-native';
import { GestureFlatList } from '../../conversions';

export type FlatListRef = GestureFlatList | null;
type Props<ItemT> = FlatListProps<ItemT> & {
  onRef?: Ref<GestureFlatList<ItemT>>;
};

export const FlatList = <ItemT,>({ onRef, ...rest }: Props<ItemT>) => {
  return (
    <GestureFlatList
      keyboardShouldPersistTaps="handled"
      // removeClippedSubviews // TODO: why add? this fixes Complete app
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
      ref={onRef}
    />
  );
};
