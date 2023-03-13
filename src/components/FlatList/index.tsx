import {
  FlashList,
  MasonryFlashList as Masonry,
  type FlashListProps,
  type ListRenderItem as RenderItem,
} from '@shopify/flash-list';
import React, { type Ref } from 'react';

export type FlatListRef<T> = FlashList<T> | null;
export type FlatListRenderItem<T> = RenderItem<T>;

type Props<ItemT> = FlashListProps<ItemT> & {
  estimatedItemSize: number;
  onRef?: Ref<FlashList<ItemT>>;
};

export const MasonryFlashList = Masonry;

export const FlatList = <ItemT,>({
  estimatedItemSize,
  onRef,
  ...rest
}: Props<ItemT>) => {
  return (
    <FlashList
      estimatedItemSize={estimatedItemSize}
      keyboardShouldPersistTaps="handled"
      ref={onRef}
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
    />
  );
};
