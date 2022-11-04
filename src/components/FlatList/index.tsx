import {
  FlashList,
  FlashListProps,
  ListRenderItem as RenderItem,
} from '@shopify/flash-list';
import React, { Ref } from 'react';

export type FlatListRef<T> = FlashList<T> | null;
export type ListRenderItem<T> = RenderItem<T>;
type Props<ItemT> = FlashListProps<ItemT> & {
  onRef?: Ref<FlashList<ItemT>>;
};

export const FlatList = <ItemT,>({ onRef, ...rest }: Props<ItemT>) => {
  return (
    <FlashList
      keyboardShouldPersistTaps="handled"
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
      ref={onRef}
    />
  );
};
