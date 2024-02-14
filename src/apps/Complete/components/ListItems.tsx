import React, { useCallback, useRef } from 'react';
import {
  FlatList,
  type FlatListReference,
  type FlatListRenderItem,
} from '../../../components';
import { useAppSelector } from '../../../redux';
import { ListItem } from './ListItem';

type ListItemsProperties = {
  readonly parentItemId: string;
};

export const ListItems = ({ parentItemId }: ListItemsProperties) => {
  const list = useAppSelector(
    (s) => s.complete.item.items[parentItemId].children,
  );
  const listReference = useRef<FlatListReference<string>>(null);
  const cardsLength = useRef(list.length);

  const onKeyExtractor = useCallback((item: string) => item, []);

  const onCardSizeChange = useCallback(() => {
    if (list.length > cardsLength.current) {
      listReference.current?.scrollToEnd();
      cardsLength.current = list.length;
    }
  }, [list.length, listReference]);

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
      onRef={listReference}
      renderItem={onRenderItem}
      showsVerticalScrollIndicator={false}
    />
  );
};
