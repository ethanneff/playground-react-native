import React, { useCallback, useRef } from 'react';
import {
  FlatList,
  type FlatListRef,
  type FlatListRenderItem,
} from '../../../components';
import { useAppSelector } from '../../../redux';
import { ListItem } from './ListItem';

type ListItemsProps = {
  readonly parentItemId: string;
};

export const ListItems = ({ parentItemId }: ListItemsProps) => {
  const list = useAppSelector(
    (s) => s.complete.item.items[parentItemId].children,
  );
  const listRef = useRef<FlatListRef<string>>(null);
  const cardsLength = useRef(list.length);

  const onKeyExtractor = useCallback((item: string) => item, []);

  const onCardSizeChange = useCallback(() => {
    if (list.length > cardsLength.current) {
      listRef.current?.scrollToEnd();
      cardsLength.current = list.length;
    }
  }, [list.length, listRef]);

  const onRenderItem = useCallback<FlatListRenderItem<string>>(
    ({ index, item }) => (
      <ListItem
        index={index}
        itemId={item}
        parentItemId={parentItemId}
      />
    ),
    [parentItemId],
  );

  return (
    <FlatList
      data={list}
      keyExtractor={onKeyExtractor}
      keyboardShouldPersistTaps="handled"
      onContentSizeChange={onCardSizeChange}
      onRef={listRef}
      renderItem={onRenderItem}
      showsVerticalScrollIndicator={false}
    />
  );
};
