// eslint-disable-next-line no-restricted-imports
import {
  FlashList as List,
  MasonryFlashList as MasonryList,
  type FlashListProps,
  type ListRenderItem,
  type MasonryFlashListRef,
} from '@shopify/flash-list';
import React, { type RefObject } from 'react';

export type FlashListType<T> = List<T>;
export type FlashListRef<T> = List<T> | null;
export type FlashListRenderItem<T> = ListRenderItem<T>;

type MasonryProps<ItemT> = FlashListProps<ItemT> & {
  estimatedItemSize: number;
  onRef?: RefObject<MasonryFlashListRef<ItemT>>;
};

export const MasonryFlashList = <ItemT,>({
  estimatedItemSize,
  onRef,
  ...rest
}: MasonryProps<ItemT>) => {
  return (
    <MasonryList
      estimatedItemSize={estimatedItemSize}
      keyboardShouldPersistTaps="handled"
      ref={onRef}
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
    />
  );
};

type ListProps<ItemT> = FlashListProps<ItemT> & {
  estimatedItemSize: number;
  onRef?: RefObject<List<ItemT>>;
};

export const FlashList = <ItemT,>({
  estimatedItemSize,
  onRef,
  ...rest
}: ListProps<ItemT>) => {
  return (
    <List
      estimatedItemSize={estimatedItemSize}
      keyboardShouldPersistTaps="handled"
      ref={onRef}
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
    />
  );
};
