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
export type FlashListReference<T> = List<T> | null;
export type FlashListRenderItem<T> = ListRenderItem<T>;

type MasonryProperties<ItemT> = FlashListProps<ItemT> & {
  readonly estimatedItemSize: number;
  readonly onRef?: RefObject<MasonryFlashListRef<ItemT>>;
};

export const MasonryFlashList = <ItemT,>({
  estimatedItemSize,
  onRef,
  ...rest
}: MasonryProperties<ItemT>) => (
  <MasonryList
    estimatedItemSize={estimatedItemSize}
    keyboardShouldPersistTaps="handled"
    ref={onRef}
    {...rest} // eslint-disable-line react/jsx-props-no-spreading
  />
);

type ListProperties<ItemT> = FlashListProps<ItemT> & {
  readonly estimatedItemSize: number;
  readonly onRef?: RefObject<List<ItemT>>;
};

export const FlashList = <ItemT,>({
  estimatedItemSize,
  onRef,
  ...rest
}: ListProperties<ItemT>) => (
  <List
    estimatedItemSize={estimatedItemSize}
    keyboardShouldPersistTaps="handled"
    ref={onRef}
    {...rest} // eslint-disable-line react/jsx-props-no-spreading
  />
);
